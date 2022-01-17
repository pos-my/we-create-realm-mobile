import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { ObjectId } from "bson";

import { useAuth } from "./AuthProvider";

const PokemonContext = React.createContext(null);

const PokemonProvider = ({children}) => {
  const { user } = useAuth();
  const [pokemonList, setPokemonList] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    return () => {
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setPokemonList([]);
      }
    };
  }, [user])

  const createPokemon = (name, hp, type1, type2) => {
    const projectRealm = realmRef.current;
    
  }

  const filterByName = (value) => {
    if (realmRef.current === null) {
      return [];
    } 

    if (value.trim().length === 0) {
      return pokemonList;
    }
    
    const filtered = realmRef.current.objects("Pokemon").filtered(`name CONTAINS[c] "${value}"`);
    return filtered.sorted("name");
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        createPokemon,
        filterByName
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context == null) {
    throw new Error("usePokemon() called outside of a PokemonProvider?");
  }
  return context;
}

export {PokemonProvider, usePokemon}