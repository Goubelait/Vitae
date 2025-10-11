import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import React from "react";
import { Pressable, Text } from "react-native";
import { usePremium } from "../state/premiumStore";
import { buyPremium } from "./iap";

export default function PremiumCard() {
  const isPremium = usePremium((s) => s.isPremium);
  if (isPremium) return null;

  return (
    <Pressable
      onPress={buyPremium}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.panel + "AA",
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 8,
        paddingVertical: 8,
        gap: 6,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Ionicons name="star" size={18} color={COLORS.accent} />
      <Text
        style={{
          color: COLORS.text,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Go Premium — 1.99 € / month
      </Text>
    </Pressable>
  );
}
