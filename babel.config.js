module.exports = function (api) {
  const platform = api.caller
    ? api.caller((caller) => caller && caller.platform)
    : undefined;
  api.cache.using(() => platform ?? "native");

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin", // ✅ seul plugin worklet
    ],
  };
};
