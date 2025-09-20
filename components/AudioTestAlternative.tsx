import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Test avec des chemins absolus
const testSound = require("assets/sounds/sleep.mp3");

export default function AudioTestAlternative() {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer(testSound);
  const status = useAudioPlayerStatus(player);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Audio Alternatif</Text>
      <Text style={styles.info}>Asset: {JSON.stringify(testSound)}</Text>
      <Text style={styles.info}>Status: {JSON.stringify(status, null, 2)}</Text>
      <Pressable style={styles.button} onPress={togglePlay}>
        <Text style={styles.buttonText}>{isPlaying ? "Arrêter" : "Jouer"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0e0e0",
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 10,
    fontFamily: "monospace",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
