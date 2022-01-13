import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import LoginButton from "./LoginButton";
import styles from "../stylesheet";

const FriendSelectionModal = ({isVisible, friendList, onSelectFriend, closeModal}) => {
  const renderFriend = (friend, index) => {
    return (
    <View 
      key={index}
      style={styles.createModalButton}>
      <LoginButton
        text={friend.email}
        onPress={() => {onSelectFriend(friend)}}
        buttonStyle={styles.collectionFriend}
        textStyle={styles.collectionFriendText} />
    </View>
    )
  }

  const friends = friendList.map(renderFriend);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text style={[styles.modalText, styles.createModalText]}>Please select a Friend to transfer the to</Text>
          <ScrollView>
            {friends}
          </ScrollView>
          <View style={styles.createModalButton}>
            <LoginButton
              text={"Cancel"}
              onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FriendSelectionModal;