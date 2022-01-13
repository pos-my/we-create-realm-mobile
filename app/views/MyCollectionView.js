import React, { useState, useEffect, useRef } from "react";
import { View, FlatList, Alert } from "react-native";

import { useFriend } from "../providers/FriendProvider";
import { useMyCollection } from "../providers/MyCollectionProvider";
import MyCollectionListItem from "../components/MyCollectionListItem";
import FriendSelectionModal from "../components/FriendSelectModal";
import styles from "../stylesheet";

export function MyCollectionView({navigation}) {
  const { collectionList, editPokemonAmount, removePokemonFromCollection } = useMyCollection();
  const { friendList, transferPokemonToFriend } = useFriend();
  const [showList, setShowList] = useState([...collectionList]);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const selectedPokemon = useRef(null);

  useEffect(() => {
    setShowList(collectionList);
  }, [collectionList])

  const handleChangeAmount = (pokemon, amount) => {
    if (amount <= 0) {
      showDeleteAlert(pokemon);
    }else {
      editPokemonAmount(pokemon, amount);
    }
  }

  const showDeleteAlert = (pokemon) => {
      Alert.alert(
        "CONFIRM DELETE", 
        "This will delete this Pokémon from your collection. Continue?",
        [
          {text: "Cancel", style: "cancel"},
          {text: "Yes", onPress: () => {           
            setShowList([]);
            removePokemonFromCollection(pokemon);
          }}
        ]
      )
  }

  const onPressTransfer = (pokemon) => {
    selectedPokemon.current = pokemon;
    setShowFriendModal(true);
  }

  const transferPokemon = (friend) => {
    const pokemonName = selectedPokemon.current.name; 
    const friendEmail = friend.email;
    setShowFriendModal(false);
    transferPokemonToFriend(friend.userId, {
      pokemonId: selectedPokemon.current.pokemonId,
      name: selectedPokemon.current.name,
      hp: selectedPokemon.current.hp,
      type1: selectedPokemon.current.type1,
      type2: selectedPokemon.current.type2
    });

    if (selectedPokemon.current.amount - 1 > 0) {
      handleChangeAmount(selectedPokemon.current, selectedPokemon.current.amount - 1);
    }else {      
      setShowList([]);
      removePokemonFromCollection(selectedPokemon.current);
    }

    showTransferAlert(pokemonName, friendEmail);
    selectedPokemon.current = null;
  }

  const closeTransferModal = () => {
    setShowFriendModal(false);
    selectedPokemon.current = null;
  }

  const showTransferAlert = (pokemonName, friendEmail) => {
    Alert.alert(
      "Tranfer Complete", 
      `${pokemonName} have been transferred to ${friendEmail}`,
      [{text: "Close"}]
    )
}

  const renderItem = ({item}) => {
    return (
      <MyCollectionListItem 
        item={item}
        onPressTransfer={onPressTransfer}
        editAmount={handleChangeAmount} />
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={showList}
        initialNumToRender={50}
        removeClippedSubviews={true}
        keyExtractor={(item) => { return item._id}}
        renderItem={renderItem} />

      <FriendSelectionModal
        isVisible={showFriendModal} 
        friendList={friendList} 
        onSelectFriend={transferPokemon} 
        closeModal={closeTransferModal} />
    </View>
  );
}