import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { User, Grid, Plus, LogOut, ArrowLeft } from "react-native-feather";
//import { AntDesign } from "@expo/vector-icons";

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

import { useUser } from "./services/userContext";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import Home from "./Screens/main/Home";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

enableScreens();

export const useRoute = (isAuth) => {
  // const navigation = useNavigation();
  // const setIsLoggedIn = useUser();
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
      // initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerStyle: {
          height: 88,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        },
        headerRightContainerStyle: {
          paddingRight: 16,
          color: "#E5E5E5", //?????
        },
        headerRight: ({ focused, size, color }) => {
          if (route.name === "Posts") {
            return (
              // <TouchableOpacity onPress={() => {setIsLoggedIn(false)}}>
              <LogOut
                stroke="rgba(189, 189, 189, 1)"
                strokeWidth={1}
                width={24}
                height={24}
              />

              // <Image
              //   style={{ width: 24, height: 24 }}
              //   source={require("./assets/images/log-out.png")}
              // />
              // </TouchableOpacity>
            );
          }
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
          color: "#E5E5E5", //?????
        },
        headerLeft: ({ focused, size, color }) => {
          if (route.name === "Create post") {
            return (
              // <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <ArrowLeft
                stroke="rgba(33, 33, 33, 0.8)"
                strokeWidth={1}
                width={24}
                height={24}
              />
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
        // headerShown: () => {
        //   if (route.name === "Profile") {
        //     return false;
        //   }
        // },
        ////////////////////////////////////////////////////////////////////////////
        tabBarStyle: {
          paddingHorizontal: 31,
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        },
        tabBarItemStyle: {},
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Posts") {
            return (
              // <Image
              //   style={{ width: 24, height: 24 }}
              //   source={require("./assets/images/grid.png")}
              // />
              <Grid
                stroke="rgba(33, 33, 33, 0.8)"
                strokeWidth={1}
                width={24}
                height={24}
              />
            );
          }
          if (route.name === "Create post") {
            // return (
            //   <View style={styles.createPostBtn}>
            //     <Image
            //       style={styles.createPostButtonTitle}
            //       source={require("../../assets/images/UnionCreatePostScreen.png")}
            //     />
            //   </View>
            // );

            const image =
              route.name === "Profile" ? (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("./assets/images/UnionNotActive.png")}
                />
              ) : (
                <View style={styles.createPostBtn}>
                  {/* <Image
                    // style={styles.createPostButtonTitle}
                    source={require("./assets/images/UnionCreatePostScreen.png")}
                  /> */}
                  <Plus stroke="#fff" strokeWidth={1} width={20} height={20} />
                </View>
              );
            return image;
          }
          if (route.name === "Profile") {
            const image = focused ? (
              <View style={styles.createPostBtn}>
                <User stroke="#fff" strokeWidth={1} width={24} height={24} />
              </View>
            ) : (
              // <Image
              //   source={require("./assets/images/user.png")}
              //   style={{ height: 24, width: 24 }}
              // />
              <User
                stroke="rgba(33, 33, 33, 0.8)"
                strokeWidth={1}
                width={24}
                height={24}
              />
            );
            return image;
          }
        },
      })}
    >
      <MainTab.Screen name="Posts" component={Home} />
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
  //   createPostButtonTitle: {
  //     width: 13,
  //     height: 13,
  //     tintColor: "#FFFFFF",
  //   },
});
