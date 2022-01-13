import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Alert } from "react-native";

import { usePokemon } from "../providers/PokemonProvider";
import { useMyCollection } from "../providers/MyCollectionProvider";
import PokemonListItem from "../components/PokemonListItem";
import styles from "../stylesheet";

export function PokemonListView({navigation}) {
  const { pokemonList, filterByName } = usePokemon();
  const { addPokemonToCollection } = useMyCollection();
  const [showList, setShowList] = useState([...pokemonList])
  const [searchString, setSearch] = useState("");

  const addToCollection = (item) => {
    addPokemonToCollection(item);
    Alert.alert(
      "Added To Collection",
      `${item.name} have been added to your collection`,
      [{text: "Close"}]
    )
  }

  const onEditSearch = (value) => {
    setSearch(value);
    if (value.trim().length > 0 && pokemonList.length > 0) {
      const newList = filterByName(value);
      setShowList(newList);
    }
  }

  const renderItem = ({item}) => {
    return (
      <PokemonListItem 
        item={item}
        onPressAdd={addToCollection} />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          value={searchString}
          onChangeText={onEditSearch}
          style={styles.searchInput}
          placeholder={"Search by name"} />
      </View>
      <FlatList
        data={showList}
        extraData={searchString}
        initialNumToRender={50}
        removeClippedSubviews={true}
        keyExtractor={(item) => { return item._id}}
        renderItem={renderItem} />
    </View>
  );
}