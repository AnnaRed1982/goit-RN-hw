import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

import { useRoute } from "../router";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const ref = createNavigationContainerRef();

const Main = () => {
  const [routeName, setRouteName] = useState();
  const [user, setUser] = useState(null);

//   const state = useSelector((state) => state);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <NavigationContainer
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
    </NavigationContainer>
  );
};

export default Main;
