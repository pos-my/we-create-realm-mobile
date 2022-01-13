import React from "react";
import { View, Text } from "react-native";
import styles from "../stylesheet";

const NotificationListItem = ({item}) => {
  return (
    <View style={[styles.pokemonItem, styles.notificationBg]}>
      <View style={styles.pokemonItemHeader}>
          <Text style={styles.pokemonItemHeaderText}>{item.title}</Text>
      </View>      
      <View style={styles.collectionItemBottom}>
        <Text style={styles.pokemonItemTypeText}>{item.message}</Text>
      </View>
    </View>
  );
}

export default NotificationListItem;