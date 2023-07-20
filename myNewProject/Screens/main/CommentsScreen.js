import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

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
  Dimensions,
  View,
  Text,
  FlatList,
} from "react-native";

import { ArrowUp } from "react-native-feather";

import { selectState } from "../../redux/auth/authSelectors";

const { width, height } = Dimensions.get("screen");

export default function CommentsScreen({ route }) {
  const { postId, uri } = route.params;
  const { login } = useSelector(selectState);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  //add comment
  const addComment = async () => {
    Keyboard.dismiss();
    try {
      const postsCollectionRef = doc(db, "posts", postId);
      await addDoc(collection(postsCollectionRef, "comments"), {
        login,
        comment,
      });
      setComment("");
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //get all comments
  const getAllComments = async () => {
    try {
      const postsCollectionRef = doc(db, "posts", postId);
      const snapshot = await getDocs(
        collection(postsCollectionRef, "comments")
      );
      if (snapshot.docs.length > 0) {
        setAllComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { width, height }]}>
        <View
          style={{ width: "100%", flex: 1, justifyContent: "space-between" }}
        >
          <View style={styles.fotoContainer}>
            <Image
              source={{ uri }}
              style={{
                flex: 1,
                height: 240,
                width: "100%",
                borderRadius: 8,
              }}
            />
          </View>
          {/* /////////////////////////////////////////////////////////////////////////// */}
          <FlatList
            data={allComments}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginBottom: 32,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.comment}>{item.login}</Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              );
            }}
          />
          {/* /////////////////////////////////////////////////////////////////////////// */}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : undefined}
          >
            <View style={styles.form}>
              <TextInput
                value={comment}
                onChangeText={(value) => setComment(value)}
                placeholder="Leave comment..."
                placeholderTextColor="#BDBDBD"
                style={styles.input}
              />
              <TouchableOpacity onPress={addComment}>
                <View style={styles.commentsBtn}>
                  <ArrowUp
                    stroke="#FFFFFF"
                    strokeWidth={1}
                    width={24}
                    height={24}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 32,
  },
  form: {
    position: "relative",
  },

  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentsBtn: {
    position: "absolute",
    top: -50,
    left: 315,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    backgroundColor: "#FF6C00",
  },
  comment: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
