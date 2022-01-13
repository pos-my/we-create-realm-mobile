import React, {useState} from "react";
import { View, TextInput, Alert, Text, TouchableOpacity } from "react-native";
import { usePokemon } from "../providers/PokemonProvider";
import { useMyCollection } from "../providers/MyCollectionProvider";
import TypeSelectionModal from "../components/TypeSelectionModal";
import LoginButton from "../components/LoginButton";
import styles from "../stylesheet";

export function CreateNewView({navigation}) {
  const { createPokemon, filterByName } = usePokemon();
  const { addPokemonToCollection } = useMyCollection();
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [haveNameError, setHaveNameError] = useState(false);
  const [haveHpError, setHaveHpError] = useState(false);
  const [showType1Modal, setShowType1Modal] = useState(false);
  const [showType2Modal, setShowType2Modal] = useState(false);

  const onEndEditingName = () => {
    setHaveNameError(isNameTaken(name));
  }

  const isNameTaken = (value) => {
    if (value.trim().length > 0) {
      const filter = filterByName(value);
      return filter.length > 0;
    }
  }

  const onChangeHP = (value) => {
    setHp(value);
    setHaveHpError(parseInt(value) <= 0);
  }

  const openType1Modal = () => {
    setShowType1Modal(true);
  }

  const closeType1Modal = () => {
    setShowType1Modal(false);
  }

  const onSelectType1 = (value) => {
    setType1(value);
    closeType1Modal();
  }

  const openType2Modal = () => {
    setShowType2Modal(true);
  }

  const closeType2Modal = () => {
    setShowType2Modal(false);
  }

  const onSelectType2 = (value) => {
    setType2(value);
    closeType2Modal();
  }

  const handleCreatePokemon = () => {
    if (haveError() === false) {
      createPokemon(name, hp, type1, type2 === "none"? null : type2);
      const created = filterByName(name);
      if (created.length > 0) {
        addPokemonToCollection(created[0]);
        showAlert("Pokémon Created", `${name} have been created and added to your collection`);
      }else {
        showAlert("Pokémon Creation Failed", "Failed to create new Pokémon");
      }
    }
  }

  const haveError = () => {
    if (haveNameError) {
      showAlert("Error", "Please change Pokémon Name");
      return true;
    }
    if (name.trim().length <= 0) {
      showAlert("Error", "Please insert Pokémon Name");
      return true;
    }
    if (hp.trim().length <= 0) {
      showAlert("Error", "Please insert Pokémon HP");
      return true;
    }
    if (haveHpError) {
      showAlert("Error", "Pokémon HP must be greater than 0");
      return true;
    }
    if (type1 === "") {
      showAlert("Error", "Please select Type1");
      return true;
    }
    if (type2 === "") {
      showAlert("Error", "Please select Type2");
      return true;
    }

    return false;
  }

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: "Close"}]
    )
  }

  const renderInput = (name, value, onChange) => {
    const onEndEdit = name === "Pokémon Name"? onEndEditingName : () => {};
    const keyboardType = name === "Pokémon HP"? "number-pad" : "default";
    return (
      <View style={styles.createItemBox}>
        <Text style={styles.createText}>{name}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.searchInput}
          placeholder={name}
          onBlur={onEndEdit}
          keyboardType={keyboardType} />
      </View>
    );
  }

  const renderTypeButton = (name, value, onPress) => {
    return (
      <View style={styles.createItemBox}>
        <Text style={styles.createText}>{name}</Text>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.searchInput, styles.createPickerButton]}>
            <Text>{value === ""? "Please select a type" : value}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (    
    <View style={styles.container}>
      <View style={styles.createContainer}>
        <Text style={styles.createInstructionText}>Please enter the information below</Text>
        {renderInput("Pokémon Name", name, setName)}
        {haveNameError? 
          <Text style={styles.createErrorText}>{`${name} have already existed`}</Text> : null
        }
        {renderInput("Pokémon HP", hp, onChangeHP)}
        {haveHpError?
          <Text style={styles.createErrorText}>HP must be greater than 0</Text> : null
        }
        {renderTypeButton("Type1", type1, openType1Modal)}
        {renderTypeButton("Type2", type2, openType2Modal)}
      </View>
      <View style={styles.createBottom}>
        <LoginButton
          text={"Create Pokémon"}
          onPress={handleCreatePokemon} />
      </View>

      <TypeSelectionModal
        isVisible={showType1Modal} 
        typeNumber={1} 
        onSelectType={onSelectType1} 
        closeModal={closeType1Modal} />
      <TypeSelectionModal
        isVisible={showType2Modal} 
        typeNumber={2} 
        onSelectType={onSelectType2} 
        closeModal={closeType2Modal} />
    </View>
  )
}