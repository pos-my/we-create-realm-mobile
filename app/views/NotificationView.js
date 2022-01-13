import React from "react";
import { View, FlatList } from "react-native";

import { useNotification } from "../providers/NotificationProvider";

import NotificationListItem from "../components/NotificationListItem";
import styles from "../stylesheet";

export function NotificationView({navigation}) {
  const { notificationList } = useNotification();

  

  const renderItem = ({item}) => {
    return (
      <NotificationListItem item={item} />
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={notificationList}
        initialNumToRender={50}
        removeClippedSubviews={true}
        keyExtractor={(item) => { return item._id}}
        renderItem={renderItem} />
    </View>
  );
}