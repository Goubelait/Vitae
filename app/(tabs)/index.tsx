import { Ionicons } from "@expo/vector-icons";
import { presetStyles } from "assets/PresetStyle";
import { ADS_ENABLED, useAds } from "components/AdsContext";
import Player from "components/Player";
import PresetList from "components/Preset";
import { useSound } from "components/SoundContext";
import { COLORS } from "constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import conditionnel pour éviter l'erreur en développement
let BannerAd: any = null;
let BannerAdSize: any = null;
let TestIds: any = null;

try {
  const adsModule = require("react-native-google-mobile-ads");
  BannerAd = adsModule.BannerAd;
  BannerAdSize = adsModule.BannerAdSize;
  TestIds = adsModule.TestIds;
} catch {
  console.log("🚫 Ads module not available (Expo Go or ADS disabled)");
}

export default function PlayerScreen() {
  const { currentPreset, isPlaying, playPreset, togglePlay } = useSound();
  const { adsRemoved, buyRemoveAds } = useAds();

  // Utilise TestIds.BANNER en développement, ton vrai ID en production
  let adUnitId: string | null = null;
  if (ADS_ENABLED && TestIds) {
    adUnitId = __DEV__
      ? TestIds.BANNER
      : "ca-app-pub-7483950421454182/5588851792";
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Vitae</Text>
            <Link href="/information" asChild>
              <Pressable>
                <Ionicons name="alert-outline" size={42} color={COLORS.text} />
              </Pressable>
            </Link>
          </View>
          <Text style={styles.subtitle}>Headphones required</Text>
        </View>

        <View style={styles.playerContainer}>
          {currentPreset && (
            <Player
              preset={currentPreset}
              isPlaying={isPlaying}
              onToggle={togglePlay}
            />
          )}
        </View>

        <View style={styles.container}>
          {presetStyles.map((preset) => (
            <PresetList
              key={preset.id}
              preset={preset}
              isSelected={currentPreset?.id === preset.id}
              onPress={() => playPreset(preset)}
            />
          ))}
        </View>
      </View>

      {/* Bannière fixée en bas */}
      {ADS_ENABLED && !adsRemoved && BannerAd && BannerAdSize && (
        <View style={styles.adContainer}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            onAdFailedToLoad={(err: any) => console.log("Ad error:", err)}
            onAdLoaded={() => console.log("Ad loaded successfully")}
          />
          <Pressable
            onPress={buyRemoveAds}
            style={{
              marginTop: 8,
              padding: 8,
              backgroundColor: "#222",
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white" }}>✨ Supprimer les pubs</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingBottom: 10, // Espace pour la bannière
  },
  adContainer: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "transparent", // Même fond que l'app
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    margin: 12,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  playerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 22,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 21,
    color: COLORS.subtext,
    marginTop: 6,
  },
});
