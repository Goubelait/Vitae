// components/ads/Banner.tsx
import { Platform } from "react-native";

// ✅ on ne déclare pas deux exports, on choisit une seule logique
let BannerAdView: any;

if (Platform.OS === "web") {
  // 🔹 sur le web : rien n’est rendu
  BannerAdView = () => null;
} else {
  // 🔹 sur iOS / Android : on charge dynamiquement la version native
  BannerAdView = require("./Banner.native").default;
}

export default BannerAdView;
