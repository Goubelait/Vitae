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
    minHeight: 125,
    borderRadius: 20,
    backgroundColor: COLORS.panel + "AA",
    padding: 16,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: COLORS.subtext,
    marginBottom: 6,
  },
  reference: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    opacity: 0.7,
    color: COLORS.subtext,
  },
});
