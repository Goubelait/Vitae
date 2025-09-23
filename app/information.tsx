import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import InfoCard from "components/InfoCard";
import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
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
        <View style={styles.row}>
          <View style={styles.cell}>
            <InfoCard
              icon="ℹ️"
              title="Note on brainwaves"
              subtitle="The terms Delta, Theta, Beta and Gamma refer to commonly used brainwave bands."
            />
          </View>
          <View style={styles.cell}>
            <InfoCard
              icon="🎧"
              title="What are binaural beats?"
              subtitle="Two slightly different tones played in each ear create a perceived third tone — the binaural beat."
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.cell}>
            <InfoCard
              icon="🧠"
              title="Delta (1 Hz) → Sleep"
              subtitle="Delta beats are linked to deeper, restorative and slow-wave sleep."
              reference="Jirakittayakorn & Wongsawat, 2017"
            />
          </View>
          <View style={styles.cell}>
            <InfoCard
              icon="🧠"
              title="Theta (8 Hz) → Relaxation"
              subtitle="Theta rhythms are tied to relaxation, stress relief, and meditative states."
              reference="Padmanabhan et al., 2005"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.cell}>
            <InfoCard
              icon="🧠"
              title="Bêta (20 Hz) → Creativity"
              subtitle="Beta activity promotes creativity, mental focus, and calm alertness."
              reference="Kennerly, 1994"
            />
          </View>
          <View style={styles.cell}>
            <InfoCard
              icon="🧠"
              title="Gamma (40 Hz) → Focus"
              subtitle="Gamma beats improve alertness, sustained attention, and task performance."
              reference="Lane et al., 1998"
            />
          </View>
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
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    minHeight: 0,
    gap: 12,
  },
  cell: {
    flex: 1,
    alignSelf: "stretch",
    height: "100%",
  },

  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
});
