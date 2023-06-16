import React, { useState, useCallback, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font"; //fonts
import * as SplashScreen from "expo-splash-screen"; //fonts
SplashScreen.preventAutoHideAsync(); //fonts

import { useRoute } from "./router";
import { UserContext } from "./services/userContext";

const ref = createNavigationContainerRef();

export default function App() {
  const [routeName, setRouteName] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <UserContext.Provider
        value={{
          setIsLoggedIn,
          login,
          setLogin,
          email,
          setEmail,
          password,
          setPassword,
        }}
      >
        <NavigationContainer
          ref={ref}
          onReady={() => {
            setRouteName(ref.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const previousRouteName = routeName;
            const currentRouteName = ref.getCurrentRoute().name;
            setRouteName(currentRouteName);
          }}
        >
          {useRoute(isLoggedIn, routeName)}
        </NavigationContainer>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
