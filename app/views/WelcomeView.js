import React, { useEffect, useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import LoginButton from "../components/LoginButton";
import styles from "../stylesheet";

export function WelcomeView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    if (user != null) {
      navigation.navigate("Main");
    }
  }, [user]);

  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <View style={styles.loginButtonBox}>
        <LoginButton
          text={"Sign In"}
          buttonStyle={styles.signInButton}
          onPress={onPressSignIn} />
        <LoginButton
          text={"Sign Up"}
          buttonStyle={styles.signUpButton}
          textStyle={styles.signUpButtonText}
          onPress={onPressSignUp} />
      </View>
    </View>
  );
}
