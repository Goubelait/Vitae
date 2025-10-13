import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SoundProvider } from "components/SoundContext";
import { initIAP, teardownIAP } from "components/iap/iap";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as StoreReview from "expo-store-review";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../_lib/reanimated-logger-config";

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
    const handleAppLaunch = async () => {
      try {
        const launches = await AsyncStorage.getItem("launchCount");
        const count = launches ? parseInt(launches) + 1 : 1;
        await AsyncStorage.setItem("launchCount", count.toString());

        if (count === 2) {
          // Vérifie que la demande est possible (selon l'OS)
          const isAvailable = await StoreReview.isAvailableAsync();
          if (isAvailable) {
            await StoreReview.requestReview(); // ✅ Demande d’avis native (App Store)
            await AsyncStorage.setItem("reviewAsked", "true");
          }
        }
      } catch (err) {
        console.warn("Review logic error:", err);
      }
    };

    const checkIfAlreadyAsked = async () => {
      const asked = await AsyncStorage.getItem("reviewAsked");
      if (!asked) {
        handleAppLaunch();
      }
    };

    checkIfAlreadyAsked();
  }, []);

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
    initIAP();
    return () => {
      teardownIAP();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SoundProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="information" options={{ headerShown: false }} />
      </Stack>
    </SoundProvider>
  );
}
