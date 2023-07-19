import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

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
} from "react-native";

import { ArrowUp } from "react-native-feather";

import { selectState } from "../../redux/auth/authSelectors";

const { width, height } = Dimensions.get("screen");

export default function CommentsScreen({ route }) {
  const navigation = useNavigation();
  const { postId, uri } = route.params;

  const { login } = useSelector(selectState);
  const [comment, setComment] = useState("");

  const addComment = async () => {
    Keyboard.dismiss();
    // console.log(comment);

    try {
      // await getDocs(collection(db, "posts"))
      //   .doc(db, "comments", postId)
      // .addDoc(collection(db, "comments"), {
      //   login,
      //   comment,
      // });

      const postsCollection = doc(db, "posts", postId);
      await addDoc(collection(postsCollection, "comments"), {
        login,
        comment,
      });

      setComment("");
      return;
      // console.log("posts", posts);
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
});
