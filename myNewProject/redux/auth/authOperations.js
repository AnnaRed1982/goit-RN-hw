import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      await updateProfile(user, { displayName: login });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
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

// const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      // return credentials.user;
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};
