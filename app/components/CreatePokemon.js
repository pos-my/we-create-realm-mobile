import * as React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function CreatePokemon() {
  const navigation = useNavigation();

  return (
    <Button
      title="Create New"
      onPress={() => {        
        navigation.navigate("CreateNew");
      }}/>
  );
}