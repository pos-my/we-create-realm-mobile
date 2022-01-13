import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { ObjectId } from "bson";

import { useAuth } from "./AuthProvider";

const FriendContext = React.createContext(null);

const FriendProvider = ({children}) => {
  const { user } = useAuth();
  const [friendList, setFriendList] = useState([]);
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
      const syncFriend = projectRealm.objects("Friend");
      let sorted = syncFriend.sorted("email");
      setFriendList([...sorted]);
      sorted.addListener(() => {
        setFriendList([...sorted]);
      });
    }).catch((err) => {
      console.log("Friend sync error", err);
    });

    return () => {
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setFriendList([]);
      }
    };
  }, [user])

  const addFriend = (userId, email) => {
    const friend = getFriendByUserId(userId);
    if (friend === null) {
      const projectRealm = realmRef.current;
      projectRealm.write(() => {
        projectRealm.create("Friend", {
          _id: new ObjectId(),
          _partition: `user=${user.customData.userId}`,
          email: email,
          userId: userId
        })
      })
    }
  }

  const getFriendByUserId = (userId) => {
    const filtered = realmRef.current.objects("Friend").filtered("userId == $0 ", userId);
    return filtered.length? filtered[0] : null;
  }

  const getFriendByUserEmail = (email) => {
    const filtered = realmRef.current.objects("Friend").filtered("email == $0 ", email);
    return filtered.length? filtered[0] : null;
  }

  const transferPokemonToFriend = (friendId, pokemon) => {
    const config = {
      sync: {
        user: user,
        partitionValue: `user=${friendId}`,
        newRealmFileBehavior: {type: 'downloadBeforeOpen'},
        existingRealmFileBehavior: {type: 'openImmediately'},
      },
    };
    Realm.open(config).then((projectRealm) => {
      const filtered = projectRealm.objects("PokemonStorage").filtered("pokemonId == $0 ", new ObjectId(pokemon.pokemonId));
      if (filtered.length) {
        projectRealm.write(() => {
          filtered.amount = amount + 1;
        })
      }else {
        projectRealm.write(() => {
          projectRealm.create("PokemonStorage", {
            _id: new ObjectId(),
            _partition: `user=${friendId}`,
            pokemonId: pokemon.pokemonId,
            name: pokemon.name,
            hp: parseInt(pokemon.hp),
            type1: pokemon.type1,
            type2: pokemon.type2,
            amount: 1
          })
        })
      }

      projectRealm.close();
    }).catch((err) => {
      console.log("Collection sync error", err);
    });
  }

  return (
    <FriendContext.Provider
      value={{
        friendList,
        addFriend,
        getFriendByUserId,
        getFriendByUserEmail,
        transferPokemonToFriend
      }}
    >
      {children}
    </FriendContext.Provider>
  );
}

const useFriend = () => {
  const context = useContext(FriendContext);
  if (context == null) {
    throw new Error("useMyCollection() called outside of a MyCollectionProvider?");
  }
  return context;
}

export {FriendProvider, useFriend}