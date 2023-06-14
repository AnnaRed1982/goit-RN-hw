import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

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

import { MapPin, Trash2 } from "react-native-feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const initialState = {
  fotoTitle: "",
  fotoLocation: "",
  locationLatitude: null,
  locationLongitude: null,
};
const { width, height } = Dimensions.get("screen");

export default function CreatePostsScreen() {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location);
    setState((prevState) => ({
      ...prevState,
      locationLatitude: location.coords.latitude,
      locationLongitude: location.coords.longitude,
    }));
    setPhoto(photo.uri);
  };

  const onPostFoto = () => {
    Keyboard.dismiss();
    console.log("Foto", state);
    setState(initialState);
    setPhoto("");
    navigation.navigate("Posts", { photo, state });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { width, height }]}>
        <View style={{ width: "100%" }}>
          {/* <View style={styles.fotoContainer}> */}

          {isFocused && (
            <Camera style={styles.foto} ref={setCamera}>
              {photo && (
                <View style={styles.takeFotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 140, width: 140, borderRadius: 8 }}
                  />
                </View>
              )}

              <TouchableOpacity style={styles.fotoOverlay} onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="camera"
                  size={24}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
            </Camera>
          )}
          {/* </View> */}

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
                    style={styles.inputLocation}
                  />
                  <TouchableOpacity style={styles.locationBtn}>
                    <MapPin
                      stroke="#BDBDBD"
                      strokeWidth={1}
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={onPostFoto}
                style={styles.createPostBtn}
              >
                <Text style={styles.createPostBtnTitle}>Post</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.trashBtn}>
          <Trash2 stroke="#BDBDBD" strokeWidth={1} width={24} height={24} />
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
  // fotoContainer: {
  //   // position: "relative",
  // },
  takeFotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
