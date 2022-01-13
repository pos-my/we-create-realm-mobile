import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import { AuthProvider } from "./providers/AuthProvider";
import { FriendProvider } from "./providers/FriendProvider";
import { PokemonProvider } from "./providers/PokemonProvider";
import { MyCollectionProvider} from "./providers/MyCollectionProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

import { WelcomeView } from "./views/WelcomeView";
import { MainView } from "./views/MainView";
import { PokemonListView } from "./views/PokemonListView";
import { MyCollectionView } from "./views/MyCollectionView";
import { CreateNewView } from "./views/CreateNewView";
import { NotificationView } from "./views/NotificationView";

import { Logout } from "./components/Logout";
import { CreatePokemon } from "./components/CreatePokemon";
import { AddPokemon } from "./components/AddPokemon";
import { RefreshNotification } from "./components/RefreshNotification";

import styles from "./stylesheet";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <FriendProvider>
        <PokemonProvider>
          <MyCollectionProvider>
            <NotificationProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Welcome View"
                    component={WelcomeView}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Main"
                    component={MainView}
                    options={{
                      title: "Pokémon Collection",
                      headerLeft: null,
                      headerRight: () => (
                        <View style={styles.headerRight}>
                          <Logout />
                        </View>
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="PokemonList"
                    component={PokemonListView}
                    options={{
                      title: "Pokémon List",
                      headerRight: () => (
                        <View style={styles.headerRight}>
                          <CreatePokemon />
                        </View>
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="MyCollection"
                    component={MyCollectionView}
                    options={{
                      title: "My Collection",
                      headerRight: () => (
                        <View style={styles.headerRight}>
                          <AddPokemon />
                        </View>
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="CreateNew"
                    component={CreateNewView}
                    options={{
                      title: "Create New Pokémon"                    
                    }}
                  />
                  <Stack.Screen
                    name="Notification"
                    component={NotificationView}
                    options={{
                      title: "Notification",
                      headerRight: () => (
                        <View style={styles.headerRight}>
                          <RefreshNotification />
                        </View>
                      ),
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </NotificationProvider>
          </MyCollectionProvider>
        </PokemonProvider>
      </FriendProvider>
    </AuthProvider>
  );
};

export default App;
