import Constants from "expo-constants";
import React, { useEffect, useMemo, useState } from "react";
import { NativeModules, View } from "react-native";
import { usePremium } from "../state/premiumStore";

export default function BannerAdView() {
  const [Ads, setAds] = useState<any>(null);
  const isPremium = usePremium((s) => s.isPremium);
  const adsEnabled = Constants.expoConfig?.extra?.adsEnabled !== false;

  const hasNativeAdsModule = useMemo(() => {
    const turboModule =
      (NativeModules as any).RNGoogleMobileAdsModule ||
      (globalThis as any)?.ExpoModules?.RNGoogleMobileAdsModule;
    return Boolean(turboModule);
  }, []);

  useEffect(() => {
    if (!hasNativeAdsModule) {
      if (!isPremium && adsEnabled) {
        console.log(
          "Ads module unavailable (missing native Google Mobile Ads module)"
        );
      }
      return;
    }

    if (isPremium || !adsEnabled) return;
    try {
      const mod = require("react-native-google-mobile-ads");
      if (mod?.default) {
        setAds(mod);
        mod.default().initialize();
      } else {
        console.log(
          "Ads module unavailable (module did not export a default initializer)"
        );
      }
    } catch (e) {
      console.log("Ads module unavailable (probably Expo Go)", e);
    }
  }, [hasNativeAdsModule, isPremium, adsEnabled]);

  if (isPremium || !Ads || !hasNativeAdsModule) return null;

  const { BannerAd, BannerAdSize } = Ads;
  return (
    <View style={{ alignItems: "center", marginTop: 8 }}>
      <BannerAd
        unitId={"ca-app-pub-7483950421454182/5588851792"}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={(e: any) => console.log("Banner failed", e)}
      />
    </View>
  );
}
