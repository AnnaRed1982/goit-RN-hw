import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
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
  FlatList,
} from "react-native";

import { MapPin, MessageCircle } from "react-native-feather";

import { useUser } from "../../services/userContext";

const { width, height } = Dimensions.get("screen");

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const { login, email } = useUser();

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts--->", posts);

  const moveMapScreen = () => {
    navigation.navigate("Comments");
  };
  const onMapScreen = (latitude, longitude) => {
    navigation.navigate("Map", {
      latitude,
      longitude,
    });
  };

  const onCommentsScreen = (uri) => {
    navigation.navigate("Comments", {uri});
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.authBox}>
        <View style={styles.boxFoto}></View>
        <View>
          <Text style={styles.nameTitle}>{login}</Text>
          <Text style={styles.emailTitle}>{email}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={moveMapScreen}>
        <Text style={[{ marginBottom: 20, fontSize: 20 }]}>
          Press to CommentsScreen
        </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 32,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{
                  height: 299,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <Text style={styles.fotoTitle}>{item.state.fotoTitle}</Text>

              <View style={styles.fotoDetails}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    onCommentsScreen(item.photo);
                  }}
                >
                  <MessageCircle
                    stroke="#BDBDBD"
                    strokeWidth={1}
                    width={24}
                    height={24}
                    style={{ transform: [{ rotate: "270deg" }] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.fotoMap}
                  onPress={() =>
                    onMapScreen(
                      item.state.locationLatitude,
                      item.state.locationLongitude
                    )
                  }
                >
                  <MapPin
                    stroke="#BDBDBD"
                    strokeWidth={1}
                    width={24}
                    height={24}
                  />
                  <Text style={styles.fotoLocation}>
                    {item.state.fotoLocation}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    justifyContent: "center",
  },
  authBox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },
  boxFoto: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  nameTitle: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  emailTitle: {
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
  },
  fotoTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 8,
  },
  fotoDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fotoMap: {
    flexDirection: "row",
    gap: 3,
  },

  fotoLocation: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});
