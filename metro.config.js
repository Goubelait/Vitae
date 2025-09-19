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

module.exports = config;
