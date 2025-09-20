const fs = require("fs");
const path = require("path");

console.log("🔍 Vérification des assets pour le build...\n");

// Vérifier les fichiers audio
const audioDir = path.join(__dirname, "..", "assets", "sounds");
const audioFiles = ["sleep.mp3", "relax.mp3", "create.mp3", "focus.mp3"];

console.log("📁 Fichiers audio:");
audioFiles.forEach((file) => {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✅ ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
  }
});

// Vérifier la configuration app.json
const appJsonPath = path.join(__dirname, "..", "app.json");
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));
  
  console.log("\n📋 Configuration app.json:");
  console.log(`  ✅ Plugins: ${JSON.stringify(appJson.expo.plugins)}`);
  console.log(`  ✅ UIBackgroundModes: ${JSON.stringify(appJson.expo.ios?.infoPlist?.UIBackgroundModes)}`);
  console.log(`  ✅ AVAudioSessionCategory: ${appJson.expo.ios?.infoPlist?.AVAudioSessionCategory}`);
}

// Vérifier metro.config.js
const metroConfigPath = path.join(__dirname, "..", "metro.config.js");
if (fs.existsSync(metroConfigPath)) {
  console.log("\n⚙️  Configuration Metro:");
  console.log("  ✅ metro.config.js trouvé");
} else {
  console.log("\n❌ metro.config.js manquant");
}

console.log("\n🎵 Vérification terminée!");
