import React, {useState} from "react";
import { View, Alert } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { useFriend } from "../providers/FriendProvider";
import LoginButton from "../components/LoginButton";
import AddFriendModal from "../components/AddFriendModal";
import styles from "../stylesheet";

export function MainView({navigation}) {
  const { addFriendByEmail } = useAuth();
  const { addFriend, getFriendByUserEmail } = useFriend();
  const [showFriendModal, setShowFriendModal] = useState(false);

  const onPressMyCollection = () => {
    navigation.navigate("MyCollection")
  }

  const onPressPokemonList = () => {
    navigation.navigate("PokemonList");
  }

  const onPressNotification = () => {
    navigation.navigate("Notification");
  }

  const onPressAddFriend = () => {
    setShowFriendModal(true);
  }

  const closeFriendModal = () => {
    setShowFriendModal(false);
  }

  const handleAddFriend = async(email) => {
    closeFriendModal();
    if (email.trim().length > 0) {
      const friend = getFriendByUserEmail(email);
      if (friend === null) {
        const result = await addFriendByEmail(email);
        showAddFriendAlert(result);
        if (result.success) {
          const {userId} = result.data;
          addFriend(userId, email);
        }
      }else {
        showAddFriendAlert({success: false, message: `${email} is already inside your Friend list`});
      }
    }
  }

  const showAddFriendAlert = (result) => {
    const message = result.success? `Successfully added ${result.data.email} as Friend` : result.message;
    Alert.alert(
      "Add Friends",
      message,
      [{text: "Close"}]
    )
  }
    
  return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <LoginButton
            text={"My Collection"}
            onPress={onPressMyCollection} />
          <LoginButton
            text={"Pokémon List"}
            onPress={onPressPokemonList}
            buttonStyle={styles.mainListButton}
            textStyle={styles.mainListButtonText} />
          <LoginButton
            text={"Notifications"}
            onPress={onPressNotification}
            buttonStyle={styles.mainNotificationButton} />
          <LoginButton
            text={"Add Friend"}
            onPress={onPressAddFriend}
            buttonStyle={styles.mainFriendButton}
            textStyle={styles.mainListButtonText} />
        </View>
        <AddFriendModal
          isVisible={showFriendModal} 
          addFriend={handleAddFriend} 
          closeModal={closeFriendModal} />
      </View>
  );
}