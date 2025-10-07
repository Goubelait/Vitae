import { COLORS } from "constants/Colors";
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
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {reference && <Text style={styles.reference}>📖 {reference}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    height: "100%",

    borderRadius: 24,
    backgroundColor: COLORS.panel + "AA",
    borderColor: COLORS.border,
    borderWidth: 2,
    padding: 14,
    gap: 6,
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
