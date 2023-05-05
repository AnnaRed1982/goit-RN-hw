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

// import PostsScreen from  "../main/PostsScreen"
// const MainTab = createBottomTabNavigator();

const { width, height } = Dimensions.get("screen");

export default function PostsScreen() {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width, height }]}>
      {/* <MainTab.Navigator>
        <MainTab.Screen name="Posts" component={PostsScreen} />
        <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
        <MainTab.Screen name="Profile" component={ProfileScreen} />
      </MainTab.Navigator> */}
    </View>
  );
}
const styles = StyleSheet.create({ container: { backgroundColor: "#fff" } });
