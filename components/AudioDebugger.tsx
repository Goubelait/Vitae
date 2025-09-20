import { presetStyles } from "assets/PresetStyle";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AudioDebugger() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [testPlaying, setTestPlaying] = useState(false);

  // Test avec le premier preset
  const testPlayer = useAudioPlayer(presetStyles[0].sound);
  const testStatus = useAudioPlayerStatus(testPlayer);

  useEffect(() => {
    const checkAudioAssets = () => {
      const info: string[] = [];

      presetStyles.forEach((preset) => {
        try {
          // Vérifier si l'asset existe
          if (preset.sound) {
            info.push(`✅ Preset ${preset.name}: Asset défini`);
            info.push(`   - Type: ${typeof preset.sound}`);
            info.push(`   - Source: ${preset.sound.uri || "local asset"}`);
          } else {
            info.push(`❌ Preset ${preset.name}: Asset non défini`);
          }
        } catch (error) {
          info.push(`❌ Preset ${preset.name}: Erreur - ${error}`);
        }
      });

      // Ajouter les infos de test audio
      info.push(`\n🎵 Test Audio (${presetStyles[0].name}):`);
      info.push(`   - Status: ${JSON.stringify(testStatus)}`);
      info.push(`   - Playing: ${testPlaying}`);

      setDebugInfo(info);
    };

    checkAudioAssets();
  }, [testStatus, testPlaying]);

  const toggleTest = () => {
    if (testPlaying) {
      testPlayer.pause();
    } else {
      testPlayer.play();
    }
    setTestPlaying(!testPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Audio Assets</Text>
      {debugInfo.map((info, index) => (
        <Text key={index} style={styles.debugText}>
          {info}
        </Text>
      ))}

      <Pressable style={styles.testButton} onPress={toggleTest}>
        <Text style={styles.testButtonText}>
          {testPlaying ? "Arrêter Test" : "Tester Audio"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 2,
  },
  testButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  testButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
