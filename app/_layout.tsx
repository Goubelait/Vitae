import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AdsProvider } from "components/AdsContext";
import { SoundProvider } from "components/SoundContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import GoogleMobileAds, { AdapterStatus } from "react-native-google-mobile-ads";
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
    GoogleMobileAds()
      .initialize()
      .then((adapterStatuses: AdapterStatus[]) => {
        console.log("✅ Google Mobile Ads initialized", adapterStatuses);
      })
      .catch((err: Error) => {
        console.error("❌ Failed to init Ads:", err);
      });
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AdsProvider>
      <SoundProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="information" options={{ headerShown: false }} />
        </Stack>
      </SoundProvider>
    </AdsProvider>
  );
}
