import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { errorMessage: "", token: null };
    default:
      return state;
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const res = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "signin", payload: res.data.token });
    navigate("TrackList");
  } catch (e) {
    dispatch({ type: "add_error", payload: e.message });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const res = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", res.data.token);
    dispatch({ type: "signin", payload: res.data.token });
    navigate("TrackList");
  } catch (e) {
    dispatch({ type: "add_error", payload: e.message });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);