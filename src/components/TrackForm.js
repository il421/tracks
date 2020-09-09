import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } = useContext(
    LocationContext
  );

  const [saveTrack] = useSaveTrack();
  return (
    <Spacer>
      <Input
        value={state.name}
        onChangeText={changeName}
        placeholder="Enter name"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {state.recording ? (
        <Button style={styles.input} title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <Spacer />
      {!state.recording && state.locations.length ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </Spacer>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20
  }
});

export default TrackForm;
