// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ajouter le support des fichiers audio
config.resolver.assetExts.push("mp3", "wav", "m4a");

module.exports = config;

// Évite les crashs de symbolication lorsque file === "<anonymous>" (bug Metro/overlay)
config.symbolicator = {
  customizeFrame: (frame) => {
    try {
      const f = frame?.file ?? "";
      if (
        typeof f === "string" &&
        (f.startsWith("<") || f.includes("<anonymous>"))
      ) {
        // on collapse ces frames → Metro ne tente pas d’ouvrir un pseudo-fichier
        return { collapse: true };
      }
    } catch {}
    return {};
  },
  customizeStack: (stack) => {
    try {
      return stack.filter(
        (frame) =>
          typeof frame.file === "string" &&
          !frame.file.startsWith("<") &&
          !frame.file.includes("<anonymous>")
      );
    } catch {
      return stack;
    }
  },
};

module.exports = config;
