import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Test avec expo-av
const testSound = require("assets/sounds/sleep.mp3");

export default function AudioTestAlternative() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [status, setStatus] = useState<any>({});

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(testSound);
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        setStatus(status);
      });
    } catch (error) {
      console.error("Erreur chargement audio:", error);
    }
  };

  const togglePlay = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Erreur lecture audio:", error);
    }
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
