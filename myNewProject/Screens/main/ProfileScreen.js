import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
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
  FlatList,
  Text,
  Dimensions,
} from "react-native";

import { db, storage } from "../../firebase/config";
import { collection, getDocs, query, where, doc } from "firebase/firestore";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

const { width, height } = Dimensions.get("screen");

import {
  authSignOutUser,
  updateUserProfile,
} from "../../redux/auth/authOperations";
import { selectState } from "../../redux/auth/authSelectors";

import {
  MapPin,
  MessageCircle,
  LogOut,
  Plus,
  ThumbsUp,
} from "react-native-feather";

export default function ProfileScreen() {
  const [userPosts, setUsersPosts] = useState([]);
  const { login, userId, photoURL } = useSelector(selectState);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getUserPostsByUserId();
  }, [userPosts]);

  //get user's posts by user id
  const getUserPostsByUserId = async () => {
    try {
      const snapshot = await getDocs(
        query(collection(db, "posts"), where("userId", "==", userId))
      );

      const collectionPostArray = [];

      for (const post of snapshot.docs) {
        // Reference to the subcollection "childCollection" inside each parent document
        const commentCollectionRef = doc(db, "posts", post.id);

        // Fetch subcollection documents
        const commentCollection = await getDocs(
          collection(commentCollectionRef, "comments")
        );

        // Create an object containing the parent document data and the subcollection data
        const postData = {
          id: post.id,
          ...post.data(),
          commentsCount: commentCollection.docs.map((childDoc) => ({
            data: childDoc.data(),
          })),
        };

        collectionPostArray.push({
          id: postData.id,
          fotoLocation: postData.fotoLocation,
          fotoTitle: postData.fotoTitle,
          locationLatitude: postData.locationLatitude,
          locationLongitude: postData.locationLongitude,
          login: postData.login,
          photo: postData.photo,
          userId: postData.userId,
          commentsCount: postData.commentsCount.length,
        });
      }

      // Set the state with the fetched data
      setUsersPosts(collectionPostArray);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  //get new avatarUrl
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
  };

  const saveNewAvatar = async () => {
    const url = await pickImage();

    if (url) {
      const response = await fetch(url);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();

      const storageRef = sRef(storage, `avatars/${uniquePostId}`);
      await uploadBytes(storageRef, file);

      const procesPhoto = await getDownloadURL(storageRef);
      console.log(procesPhoto);

      await dispatch(updateUserProfile({ photoURL: procesPhoto }));
    }
  };

  //deleteAvatar
  const deleteAvatar = async () => {
    dispatch(updateUserProfile({ photoURL: "" }));
  };

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
          <Image style={styles.avatarFoto} source={{ uri: photoURL }} />

          {photoURL ? (
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
            <TouchableOpacity style={styles.boxFotoBtn} onPress={saveNewAvatar}>
              <Plus stroke="#FF6C00" strokeWidth={1} width={20} height={20} />
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.logOutBtn} onPress={signOut}>
          <LogOut
            stroke="rgba(189, 189, 189, 1)"
            strokeWidth={1}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        {/* ///////////////////////////////////////////////////*/}
        <View>
          <Text style={styles.nameTitle}>{login}</Text>
        </View>
        {/* ///////////////////////////////////////////////////*/}
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  marginBottom: 32,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    height: 299,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
                <Text style={styles.fotoTitle}>{item.fotoTitle}</Text>

                <View style={styles.fotoDetails}>
                  <View style={{ flex: 1, flexDirection: "row", gap: 24 }}>
                    <TouchableOpacity
                      style={styles.comments}
                      onPress={() => {
                        navigation.navigate("Comments", {
                          postId: item.id,
                          uri: item.photo,
                        });
                      }}
                    >
                      {item.commentsCount > 0 ? (
                        <>
                          <MessageCircle
                            stroke="#FF6C00"
                            fill="#FF6C00"
                            strokeWidth={1}
                            width={24}
                            height={24}
                            style={{ transform: [{ rotate: "270deg" }] }}
                          />
                          <Text
                            style={[
                              styles.commentsNumber,
                              { color: "#212121" },
                            ]}
                          >
                            {item.commentsCount}
                          </Text>
                        </>
                      ) : (
                        <>
                          <MessageCircle
                            stroke="#BDBDBD"
                            strokeWidth={1}
                            width={24}
                            height={24}
                            style={{ transform: [{ rotate: "270deg" }] }}
                          />
                          <Text style={styles.commentsNumber}>
                            {item.commentsCount}
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                     onPress={}
                    >
                      <ThumbsUp
                        stroke="#FF6C00"
                        strokeWidth={1}
                        width={20}
                        height={20}
                      />
                    </TouchableOpacity> */}
                  </View>
                  <TouchableOpacity
                    style={styles.fotoMap}
                    onPress={() =>
                      onMapScreen(item.locationLatitude, item.locationLongitude)
                    }
                  >
                    <MapPin
                      stroke="#BDBDBD"
                      strokeWidth={1}
                      width={24}
                      height={24}
                    />
                    <Text style={styles.fotoLocation}>{item.fotoLocation}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", justifyContent: "flex-end", flex: 1 },
  gallaryContainer: {
    backgroundColor: "#fff",
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    paddingTop: 92,
    paddingHorizontal: 16,
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
  logOutBtn: {
    position: "absolute",
    left: 335,
    top: 32,
  },
  nameTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 33,
  },
  fotoTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,
  },
  fotoDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  commentsNumber: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  fotoMap: {
    flexDirection: "row",
    gap: 3,
  },

  fotoLocation: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
