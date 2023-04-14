import React, { useState } from "react";
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
} from "react-native";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("./assets/images/photoBG.jpg")}
          style={styles.image}
        />

        <LoginScreen />

        {/* <RegistrationScreen/> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",

    // width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    top: 0,
    // flex: 1,
    // resizeMode: "cover",
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
});
