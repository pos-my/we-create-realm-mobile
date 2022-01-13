import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../stylesheet";

const LoginButton = ({text, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity 
        style={[styles.loginButton, buttonStyle]} 
        onPress={onPress}>
      <Text style={[styles.loginButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default LoginButton;