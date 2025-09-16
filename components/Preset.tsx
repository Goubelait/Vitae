import { Ionicons } from "@expo/vector-icons";
import { Preset } from "assets/Types";
import { COLORS } from "constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PresetProps = {
  preset: Preset;
  onPress?: () => void;
};

const PresetList = ({ preset, onPress }: PresetProps) => {
  return (
    <Pressable style={styles.presetWrapper} onPress={onPress}>
      <View style={styles.preset}>
        <Text style={styles.presetName}>{preset.name}</Text>
        <Ionicons
          style={styles.presetIcon}
          name={preset.icon as any}
          size={24}
          color={COLORS.text}
        />
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
    borderWidth: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  presetIcon: {
    color: COLORS.text,
    position: "absolute",
    top: 16,
    left: 16,
    fontSize: 38,
  },
  presetName: {
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 4,
    fontWeight: "bold",
    maxWidth: 170,
  },
  presetSubtitle: {
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
