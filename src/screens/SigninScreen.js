import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

export const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spacer>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <AuthForm
          errorMessage={state.errorMessage}
          headerText="Sign In To Your Account"
          onSubmit={signin}
          submitButtonText="Sign In"
        />
        <NavLink
          text="Don't have an account? Sign up instead!"
          routeName="Signup"
        />
      </Spacer>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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
