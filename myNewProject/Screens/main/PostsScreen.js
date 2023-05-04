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

const MainTab = createBottomTabNavigator();

const { width, height } = Dimensions.get("screen");

export default function PostsScreen() {
  const navigation = useNavigation();
  return <View style={[styles.container, { width, height }]}></View>;
}
const styles = StyleSheet.create({ container: { backgroundColor: "#fff" } });
