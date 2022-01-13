import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal } from "react-native";
import LoginButton from "./LoginButton";
import styles from "../stylesheet";

const AddFriendModal = ({isVisible, addFriend, closeModal}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail("");
  }, [isVisible])

  const onPressAdd = () => {
    addFriend(email);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Please enter your friend's email</Text>
          <View style={styles.modalInputArea}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={"email"}
              keyboardType={"email-address"}
              style={styles.searchInput} />
          </View>
          <View style={styles.modalButtonRow}>
            <View style={styles.modalButton}>
              <LoginButton
                text={"Add Friend"}
                onPress={onPressAdd} />
            </View>
            <View style={styles.modalButton}>
              <LoginButton
                text={"Cancel"}
                onPress={closeModal} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AddFriendModal;