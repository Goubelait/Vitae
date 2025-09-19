import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: { sound: any };
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Player({ preset, isPlaying, onToggle }: PlayerProps) {
  const player = useAudioPlayer(preset.sound);
  const status = useAudioPlayerStatus(player);

  //debug if the sound is found
  useEffect(() => {
    if (!preset.sound) {
      console.error("Fichier audio non trouvé");
      return;
    }
  }, [preset.sound]);

  useEffect(() => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
      player.seekTo(0);
    }
  }, [isPlaying, player]);

  useEffect(() => {
    if (status.didJustFinish && isPlaying) {
      player.seekTo(0);
      player.play();
    }
  }, [status.didJustFinish, isPlaying, player]);

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={onToggle}
          style={[styles.button, isPlaying && styles.playing]}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={60}
            color={COLORS.panel}
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
});
