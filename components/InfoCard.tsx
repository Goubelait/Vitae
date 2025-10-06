import { COLORS } from "constants/Colors";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type InfoCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  reference?: string;
};

export default function InfoCard({
  icon,
  title,
  subtitle,
  reference,
}: InfoCardProps) {
  return (
    <View>
      <BlurView intensity={5} tint="light" style={styles.card}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {reference && <Text style={styles.reference}>📖 {reference}</Text>}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    height: "100%",
    borderRadius: 16,
    backgroundColor: COLORS.panel + "AA",
    padding: 14,
    gap: 6,
    justifyContent: "space-between",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 18,
    marginBottom: 0,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 0,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: COLORS.subtext,
    marginBottom: 0,
  },
  reference: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    opacity: 0.75,
    color: COLORS.subtext,
    marginTop: 0,
  },
});
