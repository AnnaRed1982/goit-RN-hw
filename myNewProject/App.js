import React, { useState, useCallback } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNavigationContainerRef } from "@react-navigation/native";
import { Provider } from "react-redux";

// import db from "./firebase/config";
// import { auth } from "./firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font"; //fonts
import * as SplashScreen from "expo-splash-screen"; //fonts
SplashScreen.preventAutoHideAsync(); //fonts

// import { useRoute } from "./router";
import { store } from "./redux/store";

import Main from "./components/Main";

// import { useDispatch } from "react-redux";
// import { authStateChanged } from "./redux/auth/authOperations";

// import { UserContext } from "./services/userContext";

// const ref = createNavigationContainerRef();

export default function App() {
  // const [routeName, setRouteName] = useState();
  // const [user, setUser] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(user);
  // const [login, setLogin] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  // });

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <UserContext.Provider
        value={{
          setIsLoggedIn,
          login,
          setLogin,
          email,
          setEmail,
          password,
          setPassword,
        }}
      > */}
      <Provider store={store}>
        <Main />
        {/* <NavigationContainer
          ref={ref}
          onReady={() => {
            setRouteName(ref.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const previousRouteName = routeName;
            const currentRouteName = ref.getCurrentRoute().name;
            setRouteName(currentRouteName);
          }}
        >
          {useRoute(user, routeName)}
        </NavigationContainer> */}
      </Provider>
      {/* </UserContext.Provider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
