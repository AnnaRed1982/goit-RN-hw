import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import { User, Grid, Plus, ArrowLeft } from "react-native-feather";

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

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/main/Home";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

enableScreens();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: {},
        }}
      >
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        },

        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerLeft: ({ focused, size, color }) => {
          const navigation = useNavigation();
          if (route.name === "Create post") {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
        ////////////////////////////////////////////////////////////////////////////
        tabBarStyle: {
          paddingHorizontal: 31,
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        },
        tabBarItemStyle: {},
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Grid
                stroke="rgba(33, 33, 33, 0.8)"
                strokeWidth={1}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === "Create post") {
            return (
              <View style={styles.createPostBtn}>
                <Plus stroke="#fff" strokeWidth={1} width={20} height={20} />
              </View>
            );
          }
          if (route.name === "Profile") {
            return (
              <User
                stroke="rgba(33, 33, 33, 0.8)"
                strokeWidth={1}
                width={24}
                height={24}
              />
            );
          }
        },
      })}
    >
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <MainTab.Screen
        options={{ tabBarStyle: { display: "none" } }}
        name="Create post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

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
});
