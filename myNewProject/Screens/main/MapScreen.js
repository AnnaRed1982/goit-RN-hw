import React from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

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
  Dimensions,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("screen");

export default function MapScreen() {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width, height }]}>
      {/* <Text>MapScreen</Text> */}
      <MapView
        style={styles.mapStyle}
        region={{
          longitude: 30.602185,
          latitude: 50.516339,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        mapType="standard"
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
          description="Hello"
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
