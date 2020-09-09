import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

export const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(
    AuthContext
  );

  return (
    <View style={styles.container}>
      <Spacer>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
          errorMessage={state.errorMessage}
          headerText="Sign Up For Tracker"
          onSubmit={signup}
          submitButtonText="Sign Up"
        />
        <NavLink
          text="Already have an account? Sign in instead!"
          routeName="Signin"
        />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
