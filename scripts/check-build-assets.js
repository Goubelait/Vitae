const fs = require("fs");
const path = require("path");

console.log("🔍 Vérification des assets pour le build de production...\n");

// Vérifier app.json
const appJsonPath = path.join(__dirname, "..", "app.json");
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
  
  console.log("📋 Configuration app.json:");
  console.log(`  ✅ assetBundlePatterns: ${JSON.stringify(appJson.expo.assetBundlePatterns)}`);
  console.log(`  ✅ Plugins: ${JSON.stringify(appJson.expo.plugins)}`);
  console.log(`  ✅ UIBackgroundModes: ${JSON.stringify(appJson.expo.ios?.infoPlist?.UIBackgroundModes)}`);
}

// Vérifier les fichiers audio
const audioDir = path.join(__dirname, "..", "assets", "sounds");
const audioFiles = ["sleep.mp3", "relax.mp3", "create.mp3", "focus.mp3"];

console.log("\n📁 Fichiers audio:");
audioFiles.forEach((file) => {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✅ ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
  }
});

// Vérifier metro.config.js
const metroConfigPath = path.join(__dirname, "..", "metro.config.js");
if (fs.existsSync(metroConfigPath)) {
  console.log("\n⚙️  Configuration Metro:");
  console.log("  ✅ metro.config.js trouvé");
  const metroConfig = fs.readFileSync(metroConfigPath, "utf8");
  if (metroConfig.includes("mp3")) {
    console.log("  ✅ Extensions audio configurées");
  } else {
    console.log("  ❌ Extensions audio manquantes");
  }
}

console.log("\n🎵 Pour corriger le problème sur TestFlight:");
console.log("1. npm run build:ios");
console.log("2. Tester le nouveau build sur TestFlight");
console.log("3. Vérifier que les sons fonctionnent");
