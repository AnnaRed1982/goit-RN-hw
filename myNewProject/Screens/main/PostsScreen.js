import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { db } from "../../firebase/config";
import { collection, getDocs, doc, ref } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

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
  FlatList,
} from "react-native";

import { MapPin, MessageCircle } from "react-native-feather";

import { selectState } from "../../redux/auth/authSelectors";

const { width, height } = Dimensions.get("screen");

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const { login, email, photoURL } = useSelector(selectState);
  const [comments, loading, error] = useCollection(collection(db, "posts"));

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const collectionPosts = await getDocs(collection(db, "posts"));

      const collectionPostArray = [];

      for (const post of collectionPosts.docs) {
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
      setPosts(collectionPostArray);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onMapScreen = (latitude, longitude) => {
    navigation.navigate("Map", {
      latitude,
      longitude,
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.authBox}>
        <View style={styles.boxFoto}>
          <Image style={styles.boxFoto} source={{ uri: photoURL }} />
        </View>
        <View>
          <Text style={styles.nameTitle}>{login}</Text>
          <Text style={styles.emailTitle}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
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
                <TouchableOpacity
                  style={styles.comments}
                  onPress={() => {
                    navigation.navigate("Comments", {
                      postId: item.id,
                      uri: item.photo,
                    });
                  }}
                >
                  <MessageCircle
                    stroke="#BDBDBD"
                    strokeWidth={1}
                    width={24}
                    height={24}
                    style={{ transform: [{ rotate: "270deg" }] }}
                  />
                  <Text style={styles.commentsNumber}>
                    {/* {new Date(Date.now()).toISOString()} */}
                    {item.commentsCount}
                  </Text>
                </TouchableOpacity>
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    justifyContent: "center",
  },
  authBox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  boxFoto: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  nameTitle: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  emailTitle: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
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
