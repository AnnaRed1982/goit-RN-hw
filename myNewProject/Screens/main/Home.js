import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { useUser } from "../../services/userContext";

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

const MainTab = createBottomTabNavigator();
// const MainStack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();
  const setIsLoggedIn = useUser();
  return (
    // <MainStack.Navigator initialRouteName="Posts">
    //   <MainStack.Screen name="Posts" component={PostsScreen} />
    //   <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} />
    //   <MainStack.Screen name="Posts" component={ProfileScreen} />
    // </MainStack.Navigator>
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
          //backgroundColor: "rgba(33, 33, 33, 0.8)",
        },
        headerRightContainerStyle: {
          paddingRight: 16,
          color: "#E5E5E5", //?????
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
          color: "#E5E5E5", //?????
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
        // cardStyle: { backgroundColor: "#FFFFFF" },
        // tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarStyle: {
          paddingHorizontal: 31,
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          //height: 83,
        },
        tabBarItemStyle: {
          //   backgroundColor: "#00ff00",
          //   margin: 5,
          //   borderRadius: 10,
        },
      }}
    >
      <MainTab.Screen
        options={{
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => {
                setIsLoggedIn(false);
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require("../../assets/images/log-out.png")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              // color: "rgba(33, 33, 33, 0.8)"
              source={require("../../assets/images/grid.png")}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={require("../../assets/images/arrow-left.png")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createPostBtn}>
              <Image
                style={styles.createPostButtonTitle}
                source={require("../../assets/images/UnionCreatePostScreen.png")}
              />
            </View>
          ),
          tabBarStyle: { display: "none" },
        }}
        name="Create post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={require("../../assets/images/user.png")}
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {},
  createPostBtn: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
  createPostButtonTitle: {
    width: 13,
    height: 13,
    tintColor: "#FFFFFF",
  },
});
