const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configuration pour inclure les fichiers audio
config.resolver.assetExts.push(
  // Audio formats
  "mp3",
  "wav",
  "aac",
  "m4a",
  "ogg",
  "wma"
);

// S'assurer que les assets sont inclus dans le bundle
config.resolver.platforms = ["ios", "android", "native", "web"];

module.exports = config;
