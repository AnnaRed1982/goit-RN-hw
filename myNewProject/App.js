import React, { useState, useCallback } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Dimensions,
} from "react-native";

import { useFonts } from "expo-font"; //fonts
import * as SplashScreen from "expo-splash-screen"; //fonts

SplashScreen.preventAutoHideAsync(); //fonts

import { useRoute } from "./router";

export default function App() {
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

  const routing = useRoute({});

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
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
