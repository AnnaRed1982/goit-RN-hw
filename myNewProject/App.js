import React, { useState, useCallback, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font"; //fonts
import * as SplashScreen from "expo-splash-screen"; //fonts
SplashScreen.preventAutoHideAsync(); //fonts

import { useRoute } from "./router";
import { UserContext } from "./services/userContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
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
      <UserContext.Provider value={setIsLoggedIn}>
        <NavigationContainer>{useRoute(isLoggedIn)}</NavigationContainer>
      </UserContext.Provider>
    </View>

    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container} onLayout={onLayoutRootView}>
    //     <Image
    //       source={require("./assets/images/photoBG.jpg")}
    //       style={styles.image}
    //     />
    //     <RegistrationScreen />
    //   </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // justifyContent: "flex-end",
  },
  // image: {
  //   position: "absolute",
  //   top: 0,
  //   width: "100%",
  // },
});
