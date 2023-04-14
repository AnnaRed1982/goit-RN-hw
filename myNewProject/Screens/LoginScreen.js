import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Button,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import RegistrationScreen from "./RegistrationScreen";

import { useFonts } from "expo-font"; //fonts
import * as SplashScreen from "expo-splash-screen"; //fonts

SplashScreen.preventAutoHideAsync(); //fonts

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  }); //fonts

  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true); //password
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  }); //input
  const [isKeyboardActive, setIsKeyboardActive] = useState(false); //keyboard

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardActive(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInputFocus = (textinput) => {
    //input
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const onLayoutRootView = useCallback(async () => {
    //fonts
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
    setHidePass(true);
  };

  return (
    <View
      style={
        isKeyboardActive ? [styles.form, { paddingBottom: 32 }] : styles.form
      }
      onLayout={onLayoutRootView}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Log in</Text>
        <View
          style={
            isKeyboardActive
              ? [styles.inputContainer, { marginBottom: 0 }]
              : styles.inputContainer
          }
        >
          <TextInput
            value={state.email}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            placeholder="Email adress"
            autoCapitalize="none"
            onFocus={() => {
              handleInputFocus("email");
            }}
            onBlur={() => {
              handleInputBlur("email");
            }}
            style={
              isFocused.email
                ? [styles.input, { borderColor: "#FF6C00" }]
                : styles.input
            }
          />
          <TextInput
            value={state.password}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, password: value }))
            }
            placeholder="Password"
            secureTextEntry={hidePass ? true : false}
            onFocus={() => {
              handleInputFocus("password");
            }}
            onBlur={() => {
              handleInputBlur("password");
            }}
            style={
              isFocused.password
                ? [styles.input, { borderColor: "#FF6C00" }]
                : styles.input
            }
          />

          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Text style={styles.inputBtn}>{hidePass ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={isKeyboardActive ? { display: "none" } : styles.btn}
          onPress={onLogin}
        >
          <Text style={styles.btnTitle}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isKeyboardActive ? [{ display: "none" }] : [{ display: "flex" }]
          }
          // onPress={() => navigation.navigate("RegistrationScreen")}
        >
          <Text style={styles.text}>Don't have an account? Register</Text>
        </TouchableOpacity>
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

    paddingTop: 32,
    paddingBottom: 111,
    paddingLeft: 16,
    paddingRight: 16,
  },

  title: {
    color: "#212121",

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,

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

  inputBtn: {
    color: "#1B4371",

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    position: "absolute",
    right: 20,
    bottom: 32,
  },

  btn: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "#FF6C00",
    borderRadius: 100,

    marginBottom: 16,
  },
  btnTitle: {
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
