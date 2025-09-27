import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ADS_ENABLED, AdsProvider } from "components/AdsContext";
import { SoundProvider } from "components/SoundContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../_lib/reanimated-logger-config";

let mobileAds: any = null;
try {
  mobileAds = require("react-native-google-mobile-ads").default;
} catch (error) {
  console.log("react-native-google-mobile-ads not available in development");
}
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    try {
      configureReanimatedLogger({
        level: ReanimatedLogLevel.warn,
        strict: false,
      });
    } catch {}
  }, []);

  useEffect(() => {
    if (!ADS_ENABLED) {
      console.log("🚫 Ads disabled: skip init");
      return;
    }

    try {
      const mobileAds = require("react-native-google-mobile-ads").default;
      mobileAds()
        .initialize()
        .then(() => console.log("✅ Google Mobile Ads initialized"))
        .catch((e: any) => console.log("❌ Ads init error:", e));
    } catch {
      console.log("🚫 Google Mobile Ads not available in this build");
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SoundProvider>
      <AdsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="information" options={{ headerShown: false }} />
        </Stack>
      </AdsProvider>
    </SoundProvider>
  );
}
