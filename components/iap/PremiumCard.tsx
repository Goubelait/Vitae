import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { COLORS } from "constants/Colors";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { usePremium } from "../state/premiumStore";
import { buyPremium, restorePurchases } from "./iap";

type PremiumExtra = {
  premium?: {
    priceMonthlyEUR?: number;
  };
};

export default function PremiumCard() {
  const isPremium = usePremium((s) => s.isPremium);
  if (isPremium) return null;

  const extra =
    (Constants.expoConfig?.extra as PremiumExtra | undefined) ??
    ((Constants as any).manifest?.extra as PremiumExtra | undefined);
  const price = extra?.premium?.priceMonthlyEUR ?? 1.99;

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 8,
        gap: 8,
      }}
    >
      <Pressable
        onPress={() => {
          void buyPremium();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.panel + "AA",
          borderRadius: 16,
          paddingVertical: 8,
          paddingHorizontal: 12,
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
          {`Support Vitae - ${price.toFixed(1.99)} EUR / month`}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          void restorePurchases();
        }}
        style={{
          alignItems: "center",
          paddingVertical: 6,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.subtext,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          Already subscribed ? Restore purchases
        </Text>
      </Pressable>
    </View>
  );
}
