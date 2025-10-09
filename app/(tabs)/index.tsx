import { Ionicons } from "@expo/vector-icons";
import { presetStyles } from "assets/PresetStyle";
import Player from "components/Player";
import PresetList from "components/Preset";
import { useSound } from "components/SoundContext";
import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PlayerScreen() {
  const { currentPreset, isPlaying, playPreset, togglePlay } = useSound();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Vitae</Text>
          <Link href="/information" asChild>
            <Pressable style={styles.infoButton}>
              <Ionicons name="alert-outline" size={30} color={COLORS.text} />
            </Pressable>
          </Link>
        </View>
        <Text style={styles.subtitle}>Headphones required</Text>
      </View>

      <View style={styles.playerContainer}>
        {currentPreset && (
          <Player
            preset={currentPreset}
            isPlaying={isPlaying}
            onToggle={togglePlay}
          />
        )}
      </View>

      <View style={styles.container}>
        {presetStyles.map((preset) => (
          <PresetList
            key={preset.id}
            preset={preset}
            isSelected={currentPreset?.id === preset.id}
            onPress={() => playPreset(preset)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 16,
    backgroundColor: "transparent",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    margin: 12,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    padding: 8,
    backgroundColor: COLORS.panel + "AA",
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 21,
    color: COLORS.subtext,
    marginTop: 6,
  },
});
