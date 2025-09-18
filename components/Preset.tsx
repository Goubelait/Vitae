import { Ionicons } from "@expo/vector-icons";
import { Preset } from "assets/Types";
import { COLORS } from "constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PresetProps = {
  preset: Preset;
  isSelected?: boolean;
  onPress?: () => void;
};

const PresetList = ({ preset, isSelected, onPress }: PresetProps) => {
  return (
    <Pressable style={styles.presetWrapper} onPress={onPress}>
      <View style={[styles.preset, isSelected && styles.selected]}>
        <Ionicons
          style={styles.presetIcon}
          name={preset.icon as any}
          size={24}
          color={isSelected ? COLORS.accent : COLORS.text}
        />
        <Text style={styles.presetName}>{preset.name}</Text>
        <Text style={styles.presetSubtitle}>{preset.subtitle}</Text>
      </View>
    </Pressable>
  );
};
export default PresetList;

const styles = StyleSheet.create({
  presetWrapper: {
    width: "48%",
    flexBasis: "48%",
  },
  preset: {
    height: 170,
    aspectRatio: 1,
    marginHorizontal: 0,
    borderRadius: 24,
    backgroundColor: COLORS.panel,
    borderColor: COLORS.border,
    borderWidth: 2,
    justifyContent: "flex-end",
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  selected: {
    borderColor: COLORS.accent,
    borderWidth: 3,
    backgroundColor: COLORS.accent + "22",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  presetIcon: {
    color: COLORS.text,
    position: "absolute",
    top: 16,
    left: 16,
    fontSize: 38,
  },
  presetName: {
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 4,
    fontWeight: "bold",
    maxWidth: 170,
  },
  presetSubtitle: {
    fontFamily: "Inter_400Regular",
    color: COLORS.subtext,
    fontSize: 14,
  },
  hiddenText: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
    fontSize: 0,
    margin: 0,
    padding: 0,
  },
});
