import { Ionicons } from "@expo/vector-icons";
import { presetStyles } from "assets/PresetStyle";
import { Preset } from "assets/Types";
import AudioDebugger from "components/AudioDebugger";
import Player from "components/Player";
import PresetList from "components/Preset";
import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlayerScreen() {
  const [selectedPreset, setSelectedPreset] = useState(presetStyles[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectPreset = (preset: Preset) => {
    setIsPlaying(false);
    setTimeout(() => {
      setSelectedPreset(preset);
    }, 200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Vitae</Text>

            <Link href="/information" asChild>
              <Pressable>
                <Ionicons name="alert-outline" size={42} color={COLORS.text} />
              </Pressable>
            </Link>
          </View>
          <Text style={styles.subtitle}>Headphones required</Text>
        </View>

        <View style={styles.playerContainer}>
          <Player
            key={selectedPreset.id}
            preset={selectedPreset}
            isPlaying={isPlaying}
            onToggle={() => setIsPlaying((v) => !v)}
          />
        </View>

        <View style={styles.container}>
          {presetStyles.map((preset) => (
            <PresetList
              key={preset.id}
              preset={preset}
              isSelected={preset.id === selectedPreset.id}
              onPress={() => selectPreset(preset)}
            />
          ))}
        </View>

        {/* Composant de debug temporaire - à retirer après test */}
        <AudioDebugger />
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
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
