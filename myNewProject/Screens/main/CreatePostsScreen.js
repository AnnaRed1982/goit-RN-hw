import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
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
  View,
  Text,
  Dimensions,
} from "react-native";

import PostsScreen from "./PostsScreen";

const initialState = {
  fotoTitle: "",
  fotoLocation: "",
};
const { width, height } = Dimensions.get("screen");

export default function CreatePostsScreen() {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();
  const onPostFoto = () => {
    // Alert.alert("Credentials", `${name} + ${password}`);
    Keyboard.dismiss();
    console.log("Foto", state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { width, height }]}>
        <View style={{ width: "100%" }}>
          <View style={styles.foto}>
            <TouchableOpacity style={styles.fotoOverlay}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require("../../assets/images/camera.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.fotoCaption}>Download foto</Text>
          {/* /////////////////////////////////////////////////////////////////// */}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={state.fotoTitle}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      fotoTitle: value,
                    }))
                  }
                  placeholder="Title..."
                  placeholderTextColor="#BDBDBD"
                  // autoCapitalize="none"
                  // onFocus={() => {
                  //   // handleInputFocus("email");
                  // }}
                  // onBlur={() => {
                  //   // handleInputBlur("email");
                  // }}
                  style={styles.input}
                />
                <View style={styles.inputLocationBox}>
                  <TextInput
                    value={state.fotoLocation}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        fotoLocation: value,
                      }))
                    }
                    placeholder="Location..."
                    placeholderTextColor="#BDBDBD"
                    // onFocus={() => {
                    //   handleInputFocus("password");
                    // }}
                    // onBlur={() => {
                    //   handleInputBlur("password");
                    // }}
                    style={styles.inputLocation}
                  />
                  <TouchableOpacity style={styles.locationBtn}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={require("../../assets/images/map-pin.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                // style={isKeyboardActive ? { display: "none" } : styles.btn}
                onPress={onPostFoto}
                style={styles.createPostBtn}
              >
                <Text style={styles.createPostBtnTitle}>Post</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.trashBtn}>
          <Image
            style={{
              width: 24,
              height: 24,
            }}
            source={require("../../assets/images/trash-2.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  foto: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  fotoOverlay: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 60 / 2,
  },
  fotoCaption: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  form: {},
  inputContainer: {
    flex: 0,
    gap: 16,
    marginBottom: 32,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputLocation: {
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 28,
  },
  inputLocationBox: {
    position: "relative",
  },
  locationBtn: {
    position: "absolute",
    top: 19,
  },
  createPostBtn: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  createPostBtnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  trashBtn: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
