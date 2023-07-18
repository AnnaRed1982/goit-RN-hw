import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
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

import { selectState } from "../../redux/auth/authSelectors";

import { storage, db } from "../../firebase/config";
import {
  ref as sRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  fotoTitle: "",
  fotoLocation: "",
  locationLatitude: null,
  locationLongitude: null,
  comments: [],
};
const { width, height } = Dimensions.get("screen");

export default function CreatePostsScreen() {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const navigation = useNavigation();
  let isFocused = useIsFocused();

  const { userId, login } = useSelector(selectState);

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
    // console.log("location", location);

    setState((prevState) => ({
      ...prevState,
      locationLatitude: location.coords.latitude,
      locationLongitude: location.coords.longitude,
    }));
    setPhoto(photo.uri);
  };

  const onMapScreen = () => {
    if (photo === "") {
      return Alert.alert("Download foto");
    }
    navigation.navigate("Map", {
      latitude: state.locationLatitude,
      longitude: state.locationLongitude,
    });
  };

  const onPost = async () => {
    Keyboard.dismiss();
    // console.log("Foto", state);
    setState(initialState);
    setPhoto("");

    await upLoadPostToServer();
    navigation.navigate("Posts", { photo, state });
  };

  const onDelete = () => {
    setState(initialState);
    setPhoto("");
  };

  const upLoadPostToServer = async () => {
    try {
      photoURL = await uploadPhotoToServer();
      const docRef = await addDoc(collection(db, "posts"), {
        photo: photoURL,
        fotoTitle: state.fotoTitle,
        fotoLocation: state.fotoLocation,
        locationLatitude: state.locationLatitude,
        locationLongitude: state.locationLongitude,
        userId,
        login,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();

      const storageRef = sRef(storage, `postImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);

      const procesPhoto = await getDownloadURL(storageRef);

      return procesPhoto;
    } catch (e) {
      console.error("Error adding foto: ", e);
      throw e;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { width, height }]}>
        <View style={{ width: "100%" }}>
          <View style={styles.fotoContainer}>
            {isFocused && (
              <Camera ref={setCamera} style={styles.camera}>
                <TouchableOpacity style={styles.fotoBtn} onPress={takePhoto}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={24}
                    color={"#BDBDBD"}
                  />
                </TouchableOpacity>
              </Camera>
            )}
            {photo && (
              <View style={styles.takeFotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    flex: 1,
                    height: 240,
                    width,
                    borderRadius: 8,
                  }}
                />
              </View>
            )}
          </View>
          {photo ? (
            <Text style={styles.fotoCaption}>Edit foto</Text>
          ) : (
            <Text style={styles.fotoCaption}>Download foto</Text>
          )}

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
                  <TouchableOpacity
                    style={styles.locationBtn}
                    onPress={onMapScreen}
                  >
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
                onPress={onPost}
                style={
                  photo && state.fotoTitle && state.fotoLocation
                    ? [styles.createPostBtn, { backgroundColor: "#FF6C00" }]
                    : styles.createPostBtn
                }
                disabled={
                  photo && state.fotoTitle && state.fotoLocation ? false : true
                }
              >
                <Text
                  style={
                    photo && state.fotoTitle && state.fotoLocation
                      ? [styles.createPostBtnTitle, { color: "#FFFFFF" }]
                      : styles.createPostBtnTitle
                  }
                >
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.trashBtn} onPress={onDelete}>
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
  fotoContainer: {
    overflow: "hidden",
    background: "transparent",
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 8,
  },
  camera: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  takeFotoContainer: {
    borderRadius: 8,
  },
  fotoBtn: {
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
