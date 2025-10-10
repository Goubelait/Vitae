import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: { sound: any };
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Player({ isPlaying, onToggle }: PlayerProps) {
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
    width: 130,
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
