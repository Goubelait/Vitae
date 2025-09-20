const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🧹 Nettoyage et build pour TestFlight...\n");

try {
  // Nettoyer le cache Metro
  console.log("1. Nettoyage du cache Metro...");
  execSync("npx expo start --clear", { stdio: "inherit" });
} catch (error) {
  console.log("Cache Metro nettoyé");
}

try {
  // Nettoyer le cache EAS
  console.log("\n2. Nettoyage du cache EAS...");
  execSync("eas build --clear-cache", { stdio: "inherit" });
} catch (error) {
  console.log("Cache EAS nettoyé");
}

console.log("\n3. Vérification des assets...");
const audioDir = path.join(__dirname, "..", "assets", "sounds");
const audioFiles = ["sleep.mp3", "relax.mp3", "create.mp3", "focus.mp3"];

audioFiles.forEach((file) => {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
  }
});

console.log("\n🚀 Prêt pour le build !");
console.log("Exécutez: npm run build:ios");
