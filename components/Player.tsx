import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import { useAudioPlayer } from "expo-audio";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: {
    sounds: { left: any; right: any };
  };
};

const Player = ({ preset }: PlayerProps) => {
  const leftPlayer = useAudioPlayer(preset.sounds.left);
  const rightPlayer = useAudioPlayer(preset.sounds.right);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await leftPlayer.pause();
      await rightPlayer.pause();
      setIsPlaying(false);
    } else {
      await leftPlayer.play();
      await rightPlayer.play();
      setIsPlaying(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={togglePlayPause}
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
};

export default Player;

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
