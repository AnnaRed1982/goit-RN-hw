import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  name: "",
  email: "", //сделать ввод с маленькой буквы
  password: "",
};

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });
  const [state, setState] = useState(initialState);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onLogin = () => {
    // Alert.alert("Credentials", `${name} + ${password}`);

    Keyboard.dismiss();
    console.log("Credentials", state);
    setState(initialState);
  };
  return (
    <View style={styles.form} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Registration</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={state.name}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            placeholder="Login"
            style={styles.input}
          />
          <TextInput
            value={state.email}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            placeholder="Email adress"
            style={styles.input}
          />
          <TextInput
            value={state.password}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={onLogin}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Already have an account? Log in</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignSelf: "center",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    paddingTop: 92,
    paddingBottom: 45,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: 212121,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    // letterSpacing: 0.01em,

    marginBottom: 33,
  },
  image: {},

  inputContainer: {
    flex: 0,
    gap: 16,

    marginBottom: 43,
  },

  input: {
    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    padding: 16,
    height: 50,
    //marginHorizontal

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  btn: {
    padding: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderRadius: 100,

    marginBottom: 16,
  },
  btnText: {
    color: "#FFFFFF",

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },

  text: {
    color: "#1B4371",

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
