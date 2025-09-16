import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { COLORS } from "constants/Colors";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Link href="/" asChild>
            <Pressable>
              <Ionicons
                name="arrow-back-outline"
                size={34}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
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
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
});
