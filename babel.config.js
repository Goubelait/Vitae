module.exports = function (api) {
  const platform = api.caller
    ? api.caller((caller) => caller && caller.platform)
    : undefined;
  api.cache.using(() => platform ?? "native");
  const isWeb = platform === "web";
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      // Only enable worklets on native platforms; it can break web
      ...(isWeb ? [] : ["react-native-worklets/plugin"]),
    ],
  };
};
