import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

// import CreatePostsScreen from "./CreatePostsScreen";
// import ProfileScreen from "./ProfileScreen";

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

// const MainTab = createBottomTabNavigator();
const MainStack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();
  const setIsLoggedIn = useUser();
  return (
    <>
      <MainStack.Navigator
        initialRouteName="Posts"
        screenOptions={{
          headerShown: false,
          cardStyle: {},
        }}
      >
        <MainStack.Screen name="PostsScreen" component={PostsScreen} />
        <MainStack.Screen name="Comments" component={CommentsScreen} />
        <MainStack.Screen name="Map" component={MapScreen} />
      </MainStack.Navigator>
    </>
  );
}
//   return (
//     <MainTab.Navigator
//       initialRouteName="Posts"
//       screenOptions={({ route }) => ({
//         tabBarShowLabel: false,
//         headerStyle: {
//           height: 88,
//           borderBottomWidth: 1,
//           borderBottomColor: "#E8E8E8",
//         },
//         headerRightContainerStyle: {
//           paddingRight: 16,
//           color: "#E5E5E5", //?????
//         },
//         headerRight: ({ focused, size, color }) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 setIsLoggedIn(false);
//               }}
//             >
//               <Image
//                 style={{ width: 24, height: 24 }}
//                 source={require("../../assets/images/log-out.png")}
//               />
//             </TouchableOpacity>
//           );
//         },
//         headerLeftContainerStyle: {
//           paddingLeft: 16,
//           color: "#E5E5E5", //?????
//         },
//         headerLeft: ({ focused, size, color }) => {
//           if (route.name === "Create post") {
//             return (
//               <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
//                 <Image
//                   style={{ width: 24, height: 24 }}
//                   source={require("../../assets/images/arrow-left.png")}
//                 />
//               </TouchableOpacity>
//             );
//           }
//         },
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontFamily: "Roboto-Medium",
//           fontSize: 17,
//           lineHeight: 22,
//           alignSelf: "center",
//           textAlign: "center",
//           justifyContent: "center",
//           flex: 0,
//           letterSpacing: -0.408,
//           color: "#212121",
//         },
//         // headerShown: () => {
//         //   if (route.name === "Profile") {
//         //     return false;
//         //   }
//         // },
//         ////////////////////////////////////////////////////////////////////////////
//         tabBarStyle: {
//           paddingHorizontal: 31,
//           borderTopColor: "#E8E8E8",
//           borderTopWidth: 1,
//         },
//         tabBarItemStyle: {},
//         tabBarIcon: ({ focused, color, size }) => {
//           if (route.name === "Posts") {
//             return (
//               <Image
//                 style={{ width: 24, height: 24 }}
//                 source={require("../../assets/images/grid.png")}
//               />
//             );
//           }
//           if (route.name === "Create post") {
//             // return (
//             //   <View style={styles.createPostBtn}>
//             //     <Image
//             //       style={styles.createPostButtonTitle}
//             //       source={require("../../assets/images/UnionCreatePostScreen.png")}
//             //     />
//             //   </View>
//             // );

//             const image =
//               route.name === "Profile" ? (
//                 <Image
//                   style={{ height: 24, width: 24 }}
//                   source={require("../../assets/images/UnionNotActive.png")}
//                 />
//               ) : (
//                 <View style={styles.createPostBtn}>
//                   <Image
//                     // style={styles.createPostButtonTitle}
//                     source={require("../../assets/images/UnionCreatePostScreen.png")}
//                   />
//                 </View>
//               );
//             return image;
//           }
//           if (route.name === "Profile") {
//             const image = focused ? (
//               <View style={styles.createPostBtn}>
//                 <Image
//                   style={{ height: 24, width: 24 }}
//                   source={require("../../assets/images/user-active.png")}
//                 />
//               </View>
//             ) : (
//               <Image
//                 source={require("../../assets/images/user.png")}
//                 style={{ height: 24, width: 24 }}
//               />
//             );
//             return image;
//           }
//         },
//       })}
//     >
//       <MainTab.Screen name="Posts" component={PostsScreen} />
//       <MainTab.Screen
//         options={{ tabBarStyle: { display: "none" } }}
//         name="Create post"
//         component={CreatePostsScreen}
//       />
//       <MainTab.Screen
//         options={{ headerShown: false }}
//         name="Profile"
//         component={ProfileScreen}
//       />
//     </MainTab.Navigator>
//   );

// const styles = StyleSheet.create({
//   container: {},
//   createPostBtn: {
//     flex: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FF6C00",
//     borderRadius: 20,
//     width: 70,
//     height: 40,
//   },
//   createPostButtonTitle: {
//     width: 13,
//     height: 13,
//     tintColor: "#FFFFFF",
//   },
// });
