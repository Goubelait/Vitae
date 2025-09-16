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
        <Pressable onPress={togglePlayPause} style={styles.button}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={60}
            color={COLORS.background}
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
    backgroundColor: COLORS.text,
    justifyContent: "center",
    alignItems: "center",
  },
});
