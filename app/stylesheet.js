import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    padding: 5,
    paddingHorizontal: 15,
    marginTop: '40%'
  },
  inputStyle: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    backgroundColor: "white",
    marginVertical: 5
  },
  manageTeamWrapper: {
    width: 350,
  },
  manageTeamTitle: {
    marginBottom: 10,
  },
  addTeamMemberInput: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    fontSize: 18,
  },
  manageTeamButtonContainer: {
    textAlign: "left",
    borderTopColor: "grey",
    borderTopWidth: 1,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: "400",
  },
  loginButtonBox: {
    marginTop: 25,
    paddingHorizontal: 15
  },
  loginButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "black"
  },
  signInButton: {
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: "#1aa7ec"
  },
  signUpButtonText: {
    color: "white"
  },

  headerLeft: {
    marginLeft: 10
  },
  headerRight: {
    marginRight: 10
  },

  //MAIN SCREEN
  mainContainer: {
    marginTop: "30%",
    paddingHorizontal: 15,
  },
  mainListButton: {
    marginTop: 15,
    backgroundColor: "#3b4cca",
  },
  mainListButtonText: {
    color: '#fff'
  },
  mainNotificationButton: {
    marginTop: 15,
    backgroundColor: "#ffde00"
  },
  mainFriendButton: {
    marginTop: 15,
    backgroundColor: "#3d7dca"
  },

  //POKEMON LIST
  inputArea: {
    backgroundColor: "#fff",
    padding: 20,
    paddingHorizontal: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  searchInput: {
    borderColor: "#333",
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5
  },
  pokemonItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 2
  },
  pokemonItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pokemonItemHeaderText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  pokemonItemTypeText: {    
    fontSize: 15,
    fontWeight: "100"
  },
  pokemonItemBottom: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
  pokemonItemAddButton: {
    width: "90%",
    paddingVertical: 5,
  },

  //MY COLLECTION
  collectionItemBottom: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  collectionItemTransfer: {
    width: "40%"
  },
  collectionItemAmount: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  collectionItemAmountBtn: {
    width: "25%",
  },
  collectionItemAmountBtnTxt: {
    fontSize: 18,
    fontWeight: "bold"
  },
  collectionFriend: {
    backgroundColor: "#3b4cca",
  },
  collectionFriendText: {
    color: "#fff"
  },

  //CREATE NEW
  createContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
  createInstructionText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5
  },
  createErrorText: {
    color: "#f33"
  },
  createText: {
    fontSize: 16,
    marginBottom: 5
  },
  createItemBox: {
    marginTop: 15
  },
  createPickerButton: {
    paddingHorizontal: 5
  },
  createBottom: {
    borderTopColor: "#555",
    borderTopWidth: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 15,
    height: "10%",
    justifyContent: 'center'
  },
  createModalText: {
    marginBottom: 15
  },
  createModalButton: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5
  },

  //NOTIFICATION
  notificationBg: {
    backgroundColor: "#fff"
  },

  //ADD FRIEND MODAL
  modalBackground: {
    flex: 1,
    backgroundColor: "#55555533",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "95%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#333",
    borderRadius: 5,
  },
  modalText: {
    fontSize: 17,
    textAlign: "center"
  },
  modalInputArea: {
    paddingVertical: 15
  },
  modalButtonRow: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalButton: {
    width: "45%",
    borderBottomWidth: 1,
    borderColor: "#333",
  }
});

export default styles;
