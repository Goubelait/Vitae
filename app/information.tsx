import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import InfoCard from "components/InfoCard";
import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InformationScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "transparent" }}
      edges={["top", "left", "right", "bottom"]}
    >
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <View style={styles.left}>
          <Link href="/" asChild>
            <Pressable style={styles.backButton}>
              <Ionicons name="arrow-back-outline" size={28} color={COLORS.text} />
            </Pressable>
          </Link>
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Sound guide</Text>
        </View>
        <View style={styles.right} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>Quick guide</Text>
          <Text style={styles.heroTitle}>Understand binaural beats</Text>
          <Text style={styles.heroSubtitle}>
            A concise overview to help you choose the right frequency for the state you want.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Essentials</Text>
        </View>
        <View style={styles.cardStack}>
          <InfoCard
            icon="🧠"
            title="Note on brainwaves"
            subtitle="Delta, Theta, Beta and Gamma are brainwave bands linked to specific mental states."
          />
          <InfoCard
            icon="🎧"
            title="What are binaural beats?"
            subtitle="Two close tones in each ear create a third perceived tone — the binaural beat."
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Frequency bands</Text>
        </View>
        <View style={styles.cardStack}>
          <InfoCard
            icon="🌙"
            title="Delta (1 Hz) — Sleep"
            subtitle="Delta beats support deep, restorative sleep and slow-wave rest."
            reference="Jirakittayakorn & Wongsawat, 2017"
          />
          <InfoCard
            icon="🌊"
            title="Theta (8 Hz) — Relaxation"
            subtitle="Theta rhythms encourage calm, stress relief, and meditative flow."
            reference="Padmanabhan et al., 2005"
          />
          <InfoCard
            icon="✨"
            title="Beta (20 Hz) — Creativity"
            subtitle="Beta activity helps maintain engaged focus and steady productivity."
            reference="Kennerly, 1994"
          />
          <InfoCard
            icon="⚡"
            title="Gamma (40 Hz) — Focus"
            subtitle="Gamma beats improve alertness, working memory, and sustained attention."
            reference="Lane et al., 1998"
          />
        </View>
      </ScrollView>
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
    width: 44,
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: 44,
    alignItems: "flex-end",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.panel + "AA",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 16,
  },
  hero: {
    backgroundColor: COLORS.panel + "B0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  heroEyebrow: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: COLORS.subtext,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: COLORS.text,
  },
  heroSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.subtext,
  },
  sectionHeader: {
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: COLORS.subtext,
  },
  cardStack: {
    gap: 12,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: COLORS.text,
    textAlign: "center",
  },
});
