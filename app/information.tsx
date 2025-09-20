import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <View style={styles.left}>
          <Link href="/" asChild>
            <Pressable>
              <Ionicons
                name="arrow-back-outline"
                size={32}
                color={COLORS.text}
              />
            </Pressable>
          </Link>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Binaural Beats</Text>
        </View>
        <View style={styles.right} />
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>🎧 What are binaural beats ?</Text>
          <Text style={styles.contentText}>
            When two slightly different tones are played in each ear, the brain
            perceives a third tone — the difference between the two frequencies.
            This is called a binaural beat.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>
            🌙 Delta (1 Hz) → Sommeil profond
          </Text>
          <Text style={styles.contentText}>
            Binaural beats in the delta range are linked to deeper, restorative
            sleep
          </Text>
          <Text style={styles.contentText}>
            📖 Jirakittayakorn & Wongsawat, 2017
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>🌊 Theta (8 Hz) → Relaxation</Text>
          <Text style={styles.contentText}>
            Theta frequencies are associated with relaxation, reduced stress,
            and meditative states.
          </Text>
          <Text style={styles.contentText}>📖 Padmanabhan et al., 2005</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>🌅 Beta (20 Hz) → Créativité</Text>
          <Text style={styles.contentText}>
            Beta rhythms are known to promote creativity and calm alertness.
          </Text>
          <Text style={styles.contentText}>📖 Kennerly, 1994</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>
            ⚡ Gamma (40 Hz) → Concentration
          </Text>
          <Text style={styles.contentText}>
            Listening to gamma beats can improve alertness, attention, and task
            performance
          </Text>
          <Text style={styles.contentText}>📖 Lane et al., 1998</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    width: "100%",
    alignSelf: "center",
  },
  left: {
    width: 40,
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: 40,
    alignItems: "flex-end",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  content: {
    minHeight: 100, // instead of fixed 150
    width: "100%",
    borderRadius: 16, // slightly smaller
    backgroundColor: COLORS.panel,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 12, // more compact
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    gap: 2,
  },
  contentTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14, // smaller
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  contentText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12, // smaller
    color: COLORS.subtext,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24, // smaller header
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
});
