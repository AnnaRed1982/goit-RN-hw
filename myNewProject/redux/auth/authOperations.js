import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      await updateProfile(user, { displayName: login });
      await updateProfile(user, { photoURL: avatar });

      const { uid, displayName, photoURL } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          email,
          photoURL,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export const authStateChangedUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );
    }
  });
};

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  // await signOut(auth);

  try {
    // Check if a user is logged in before attempting to log them out
    const currentUser = auth.currentUser;
    if (currentUser) {
      await signOut(auth);
      // Do additional cleanup or navigation if needed
    } else {
      console.log("User is not logged in.");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
  dispatch(authSignOut());
};

export const updateUserProfile = (update) => async (dispatch, getState) => {
  const user = auth.currentUser;
  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      throw error;
    }
  }
};
