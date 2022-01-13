import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LoginButton from "./LoginButton";
import TypeColours from "../constants/TypeColours";
import styles from "../stylesheet";

const PokemonListItem = ({item, onPressAdd}) => {
  const handleAdd = () => {
    onPressAdd(item);
  }

  return (
    <View style={[styles.pokemonItem, {backgroundColor: TypeColours[item.type1]}]}>
      <View style={styles.pokemonItemHeader}>
          <Text style={styles.pokemonItemHeaderText}>{item.name}</Text>
          <Text style={styles.pokemonItemHeaderText}>{item.hp} HP</Text>
      </View>
      <Text style={styles.pokemonItemTypeText}>Type: <Text>{item.type1}{item.type2? ',' : ''} {item.type2}</Text></Text>
      <View style={styles.pokemonItemBottom}>
        <LoginButton
          text={"Add to My Collection"}
          onPress={handleAdd}
          buttonStyle={styles.pokemonItemAddButton} />
      </View>
    </View>
  );
}

export default PokemonListItem;