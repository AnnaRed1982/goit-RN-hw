import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/main/Home";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
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
    <Home />
    // <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
    //   <MainTab.Screen name="Posts" component={PostsScreen}></MainTab.Screen>
    //   <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
    //   <MainTab.Screen name="Profile" component={ProfileScreen} />
    // </MainTab.Navigator>
  );
};
