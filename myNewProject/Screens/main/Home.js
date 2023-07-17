import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

import { authSignOutUser } from "../../redux/auth/authOperations";
// import { useUser } from "../../services/userContext";

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
} from "react-native";

import { ArrowLeft, LogOut } from "react-native-feather";

const MainStack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <>
      <MainStack.Navigator
        initialRouteName="Posts"
        screenOptions={({ route }) => ({
          headerStyle: {
            height: 88,
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            alignSelf: "center",
            textAlign: "center",
            justifyContent: "center",
            flex: 0,
            letterSpacing: -0.408,
            color: "#212121",
          },
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerLeft: ({ focused, size, color }) => {
            const navigation = useNavigation();
            if (route.name === "Map" || route.name === "Comments") {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
                  <ArrowLeft
                    stroke="rgba(33, 33, 33, 0.8)"
                    strokeWidth={1}
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              );
            }
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerRight: ({ focused, size, color }) => {
            if (route.name === "Posts") {
              return (
                <TouchableOpacity onPress={signOut}>
                  <LogOut
                    stroke="rgba(189, 189, 189, 1)"
                    strokeWidth={1}
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              );
            }
          },
        })}
      >
        <MainStack.Screen name="Posts" component={PostsScreen} />
        <MainStack.Screen name="Comments" component={CommentsScreen} />
        <MainStack.Screen name="Map" component={MapScreen} />
      </MainStack.Navigator>
    </>
  );
}
