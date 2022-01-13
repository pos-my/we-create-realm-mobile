import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { ObjectId } from "bson";

import { useAuth } from "./AuthProvider";

const CollectionContext = React.createContext(null);

const MyCollectionProvider = ({children}) => {
  const { user } = useAuth();
  const [collectionList, setCollectionList] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const config = {
      sync: {
        user: user,
        partitionValue: `user=${user.customData.userId}`,
        newRealmFileBehavior: {type: 'downloadBeforeOpen'},
        existingRealmFileBehavior: {type: 'openImmediately'},
      },
    };
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;
      const syncCollection = projectRealm.objects("PokemonStorage");
      let sorted = syncCollection.sorted("name");
      setCollectionList([...sorted]);
      sorted.addListener(() => {
        setCollectionList([...sorted]);
      });
    }).catch((err) => {
      console.log("Collection sync error", err);
    });

    return () => {
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setCollectionList([]);
      }
    };
  }, [user])

  const addPokemonToCollection = (pokemon) => {
    const collectionPokemon = getPokemonById(pokemon._id);
    if (collectionPokemon === null) {
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.create("PokemonStorage", {
          _id: new ObjectId(),
          _partition: `user=${user.customData.userId}`,
          pokemonId: pokemon._id,
          name: pokemon.name,
          hp: parseInt(pokemon.hp),
          type1: pokemon.type1,
          type2: pokemon.type2,
          amount: 1
        })
      })
    }else {
      editPokemonAmount(collectionPokemon, collectionPokemon.amount + 1);
    }
  }

  const getPokemonById = (pokemonId) => {
    const filtered = realmRef.current.objects("PokemonStorage").filtered("pokemonId == $0 ", new ObjectId(pokemonId));
    return filtered.length? filtered[0] : null;
  }

  const editPokemonAmount = (pokemon, amount) => {
    const projectRealm = realmRef.current;
    const collectionPokemon = projectRealm.objectForPrimaryKey("PokemonStorage", new ObjectId(pokemon._id));
    projectRealm.write(() => {
      collectionPokemon.amount = amount;
    })
  }

  const removePokemonFromCollection = (pokemon) => {
    const projectRealm = realmRef.current;
    const collectionPokemon = projectRealm.objectForPrimaryKey("PokemonStorage", new ObjectId(pokemon._id));
    projectRealm.write(() => {
      projectRealm.delete(collectionPokemon);
    })
  }

  return (
    <CollectionContext.Provider
      value={{
        collectionList,
        addPokemonToCollection,
        editPokemonAmount,
        removePokemonFromCollection
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

const useMyCollection = () => {
  const context = useContext(CollectionContext);
  if (context == null) {
    throw new Error("useMyCollection() called outside of a MyCollectionProvider?");
  }
  return context;
}

export {MyCollectionProvider, useMyCollection}