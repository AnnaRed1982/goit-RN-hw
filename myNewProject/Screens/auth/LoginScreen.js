import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Button,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const { width, height } = Dimensions.get("screen");

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true); //password hide/show
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isKeyboardActive, setIsKeyboardActive] = useState(false); //keyboard

  const navigation = useNavigation();

  const dispatch = useDispatch();

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
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const onLogin = () => {
    if (state.email === "") {
      return Alert.alert("Email is required");
    } else if (state.password === "") {
      return Alert.alert("Password is required");
    }

    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setHidePass(true);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          width,
          height,
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Image
          source={require("../../assets/images/photoBG.jpg")}
          style={{
            width,
            height,
            justifyContent: "flex-end",
            position: "absolute",
            top: 0,
          }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
          <View
            style={
              isKeyboardActive
                ? [styles.form, { paddingBottom: 32 }]
                : styles.form
            }
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
                <Text style={styles.inputBtn}>
                  {hidePass ? "Show" : "Hide"}
                </Text>
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
              onPress={() => {
                setState(initialState);
                navigation.navigate("Registration");
              }}
            >
              <Text style={styles.text}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {},
  form: {
    flex: 0,
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
