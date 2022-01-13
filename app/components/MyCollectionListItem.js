import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LoginButton from "./LoginButton";
import TypeColours from "../constants/TypeColours";
import styles from "../stylesheet";

const MyCollectionListItem = ({item, onPressTransfer, editAmount}) => {
  const handlePressTransfer = () => {
    onPressTransfer(item);
  }

  const increaseAmount = () => {
    editAmount(item, item.amount + 1);
  }

  const decreaseAmount = () => {
    editAmount(item, item.amount - 1);
  }

  return (
    <View style={[styles.pokemonItem, {backgroundColor: TypeColours[item.type1]}]}>
      <View style={styles.pokemonItemHeader}>
          <Text style={styles.pokemonItemHeaderText}>{item.name}</Text>
          <Text style={styles.pokemonItemHeaderText}>{item.hp} HP</Text>
      </View>
      <Text style={styles.pokemonItemTypeText}>Type: <Text>{item.type1}{item.type2? ',' : ''} {item.type2}</Text></Text>
      <View style={styles.collectionItemBottom}>
        <View style={styles.collectionItemTransfer}>
          <LoginButton
            text={"Transfer To Friend"}
            onPress={handlePressTransfer}
            buttonStyle={styles.collectionFriend}
            textStyle={styles.collectionFriendText} />
        </View>
        <View style={styles.collectionItemAmount}>
          <View style={styles.collectionItemAmountBtn}>
            <LoginButton
              text={"-"}
              onPress={decreaseAmount}
              textStyle={styles.collectionItemAmountBtnTxt} />
          </View>
          <Text style={styles.pokemonItemHeaderText}>{item.amount}</Text>
          <View style={styles.collectionItemAmountBtn}>
            <LoginButton
              text={"+"}
              onPress={increaseAmount}
              textStyle={styles.collectionItemAmountBtnTxt} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyCollectionListItem;