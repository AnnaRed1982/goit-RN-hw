import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

import { useRoute } from "../router";

// import { auth } from "../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

import { authStateChangedUser } from "../redux/auth/authOperations";

import { selectState } from "../redux/auth/authSelectors";

const ref = createNavigationContainerRef();

const Main = () => {
  const [routeName, setRouteName] = useState();
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const { stateChange } = useSelector(selectState);
  console.log(stateChange);
  // const stateChange = false;

  useEffect(() => {
    dispatch(authStateChangedUser());
  }, []);

  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  // });

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
      {useRoute(stateChange, routeName)}
    </NavigationContainer>
  );
};

export default Main;
