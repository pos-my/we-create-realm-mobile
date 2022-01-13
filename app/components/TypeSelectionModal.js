import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import LoginButton from "./LoginButton";
import TypeList from "../constants/TypeList";
import TypeColours from "../constants/TypeColours";
import styles from "../stylesheet";

const TypeSelectionModal = ({isVisible, typeNumber, onSelectType, closeModal}) => {
  const renderType = (typeValue, index) => {
    return (
    <View 
      key={index}
      style={styles.createModalButton}>
      <LoginButton
        text={typeValue}
        onPress={() => {onSelectType(typeValue)}}
        buttonStyle={{backgroundColor: TypeColours[typeValue]}} />
    </View>
    )
  }

  const typeButton = TypeList.map(renderType);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Text style={[styles.modalText, styles.createModalText]}>Please select a Type</Text>
          <ScrollView>
            {typeNumber === 2? renderType("none") : null}
            {typeButton}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default TypeSelectionModal;