import { Ionicons } from "@expo/vector-icons";
import { presetStyles } from "assets/PresetStyle";
import { useAds } from "components/AdsContext";
import Player from "components/Player";
import PresetList from "components/Preset";
import { useSound } from "components/SoundContext";
import { COLORS } from "constants/Colors";
import { AdMobBanner } from "expo-ads-admob";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlayerScreen() {
  const { currentPreset, isPlaying, playPreset, togglePlay } = useSound();
  const { adsRemoved, buyRemoveAds } = useAds();
  const Banner = AdMobBanner as unknown as React.ComponentType<any>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <LinearGradient
        colors={["#0D1F23", "#132E35", "#0D1F23"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
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
      {!adsRemoved && (
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-xxxxxxxxxxxxx/xxxxxxxxxxx"
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(err) => console.log(err)}
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
  body: {
    flex: 1,
    gap: 16,
    backgroundColor: "transparent",
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
