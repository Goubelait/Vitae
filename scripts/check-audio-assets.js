const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "..", "assets", "sounds");
const audioFiles = ["sleep.mp3", "relax.mp3", "create.mp3", "focus.mp3"];

console.log("🔍 Vérification des fichiers audio...\n");

let allFilesExist = true;

audioFiles.forEach((file) => {
  const filePath = path.join(audioDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${file} - FICHIER MANQUANT`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log("\n🎵 Tous les fichiers audio sont présents !");
} else {
  console.log("\n⚠️  Certains fichiers audio sont manquants !");
  process.exit(1);
}
