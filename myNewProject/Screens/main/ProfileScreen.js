import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
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
import { LogOut, Plus } from "react-native-feather";

const { width, height } = Dimensions.get("screen");

import { useUser } from "../../services/userContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {
    setIsLoggedIn,
    setLogin,
    setEmail,
    setPassword,
    email,
    password,
    login,
  } = useUser();

  const isFocused = useIsFocused();
  return (
    <View style={[styles.container, { width, height }]}>
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
      <View style={styles.gallaryContainer}>
        <View style={styles.boxFoto}>
          <TouchableOpacity
            style={styles.boxFotoBtn}
            // onPress={}
          >
            <Plus
              stroke="#BDBDBD"
              strokeWidth={1}
              width={20}
              height={20}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => {
            setIsLoggedIn(false);
            setLogin("");
            setEmail("");
            setPassword("");
          }}
        >
          <LogOut
            stroke="rgba(189, 189, 189, 1)"
            strokeWidth={1}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", justifyContent: "flex-end", flex: 1 },
  gallaryContainer: {
    backgroundColor: "#fff",
    minHeight: "50%",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  boxFoto: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 120,
    top: -52,
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
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 25 / 2,
    padding: 11 / 2,
  },
  logOutBtn: {
    position: "absolute",
    left: 335,
    top: 32,
  },
});
