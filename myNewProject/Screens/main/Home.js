import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

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

export default function Home() {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          height: 88,
          //   backgroundColor: "rgba(33, 33, 33, 0.8)",
        },
        headerRightContainerStyle: {
          paddingRight: 10,
          color: "#E5E5E5", //?????
        },
        // headerContainerStyle: { padding: 10 },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: 17,
          lineHeight: 22,
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 0,
          letterSpacing: -0.408,
          color: "#212121",
        },
        cardStyle: { backgroundColor: "#FFFFFF" },
        // tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        // tabBarActiveTintColor: "#e91e63",
        // tabBarIconStyle:,
          tabBarStyle: {
            paddingHorizontal: 31,   
          //   backgroundColor: "fff",
          //   flex: 0,
          //   gap: 9,
          //   height: 83,
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
            <Image
              style={{
                width: 24,
                height: 24,
              }}
              source={require("../../assets/images/log-out.png")}
            />
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
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.createPostBtn}>
              <Image
                style={styles.createPostButtonTitle}
                source={require("../../assets/images/UnionCreatePostScreen.png")}
              />
            </View>
          ),
        }}
        name="CreatePosts"
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
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", flex: 0, gap: 31 },
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
    // color: "#FFFFFF",
  },
});
