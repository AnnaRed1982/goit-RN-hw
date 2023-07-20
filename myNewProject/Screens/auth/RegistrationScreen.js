import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
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
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

import { Plus } from "react-native-feather";

const { width, height } = Dimensions.get("screen");

const initialState = {
  avatar: null,
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [hidePass, setHidePass] = useState(true); //password
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [isKeyboardActive, setIsKeyboardActive] = useState(false); //keyboard

  const navigation = useNavigation();

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
    if (state.login === "") {
      return Alert.alert("Login is required");
    } else if (state.email === "") {
      return Alert.alert("Email is required");
    } else if (state.password === "") {
      return Alert.alert("Password is required");
    }

    Keyboard.dismiss();
    setHidePass(true);
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevState) => ({ ...prevState, avatar: result.assets[0].uri }));
      // console.log(state.avatar);
      // setImage(result.uri);
    }
  };

  const deleteAvatar = () => {
    setState((prevState) => ({ ...prevState, avatar: null }));
  }

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
            <View style={styles.boxFoto}>
              <Image style={styles.avatarFoto} source={{ uri: state.avatar }} />
              {state.avatar ? (
                <TouchableOpacity
                  style={styles.boxFotoDeleteBtn}
                  onPress={deleteAvatar}
                >
                  <Plus
                    stroke="#BDBDBD"
                    strokeWidth={1}
                    width={20}
                    height={20}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.boxFotoBtn} onPress={pickImage}>
                  <Plus
                    stroke="#FF6C00"
                    strokeWidth={1}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.title}>Registration</Text>
            <View
              style={
                isKeyboardActive
                  ? [styles.inputContainer, { marginBottom: 0 }]
                  : styles.inputContainer
              }
            >
              <TextInput
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
                placeholder="Login"
                autoCapitalize="none"
                onFocus={() => {
                  handleInputFocus("name");
                }}
                onBlur={() => {
                  handleInputBlur("name");
                }}
                style={
                  isFocused.name
                    ? [styles.input, { borderColor: "#FF6C00" }]
                    : styles.input
                }
              />
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
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isKeyboardActive ? [{ display: "none" }] : [{ display: "flex" }]
              }
              onPress={() => {
                // setLogin("");
                // setEmail("");
                // setPassword("");
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.text}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
  boxFoto: {
    position: "absolute",
    width: 120,
    height: 120,
    left: (width - 25 - 16 * 2) / 2.5,
    top: -52,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarFoto: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 0,
    top: 0,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  boxFotoBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 106,
    top: 80,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 25 / 2,
    padding: 11 / 2,
  },
  boxFotoDeleteBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 106,
    top: 80,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 25 / 2,
    padding: 11 / 2,
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
