import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: { sound: any };
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Player({ preset, isPlaying, onToggle }: PlayerProps) {
  const [audioError, setAudioError] = useState(false);
  const player = useAudioPlayer(preset.sound);
  const status = useAudioPlayerStatus(player);

  // Configuration audio - setAudioModeAsync n'existe pas dans expo-audio

  //debug if the sound is found
  useEffect(() => {
    if (!preset.sound) {
      console.error("Fichier audio non trouvé");
      setAudioError(true);
      return;
    }
    setAudioError(false);
  }, [preset.sound]);

  useEffect(() => {
    if (audioError) {
      Alert.alert(
        "Erreur Audio",
        "Le fichier audio n'a pas pu être chargé. Veuillez redémarrer l'application.",
        [{ text: "OK" }]
      );
      return;
    }

    if (isPlaying) {
      try {
        player.play();
      } catch (error) {
        console.error("Erreur lors de la lecture:", error);
        setAudioError(true);
      }
    } else {
      try {
        player.pause();
        player.seekTo(0);
      } catch (error) {
        console.error("Erreur lors de la pause:", error);
      }
    }
  }, [isPlaying, player, audioError]);

  useEffect(() => {
    if (status.didJustFinish && isPlaying && !audioError) {
      try {
        player.seekTo(0);
        player.play();
      } catch (error) {
        console.error("Erreur lors de la relecture:", error);
        setAudioError(true);
      }
    }
  }, [status.didJustFinish, isPlaying, player, audioError]);

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={onToggle}
          style={[
            styles.button,
            isPlaying && styles.playing,
            audioError && styles.error,
          ]}
          disabled={audioError}
        >
          <Ionicons
            name={audioError ? "warning" : isPlaying ? "pause" : "play"}
            size={60}
            color={audioError ? "#ff4444" : COLORS.panel}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 140,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  playing: {
    backgroundColor: COLORS.accent + "98",
  },
  error: {
    backgroundColor: "#ff4444",
    opacity: 0.7,
  },
});
