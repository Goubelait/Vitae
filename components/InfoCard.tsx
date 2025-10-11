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
      <View style={styles.iconBadge}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textStack}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {reference && <Text style={styles.reference}>Source · {reference}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 22,
    backgroundColor: COLORS.panel + "C0",
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.border + "55",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  textStack: {
    gap: 6,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: COLORS.subtext,
    lineHeight: 20,
  },
  reference: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: COLORS.subtext,
    opacity: 0.8,
  },
});
