import { presetStyles } from "assets/PresetStyle";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AudioDebugger() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

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

      setDebugInfo(info);
    };

    checkAudioAssets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Audio Assets</Text>
      {debugInfo.map((info, index) => (
        <Text key={index} style={styles.debugText}>
          {info}
        </Text>
      ))}
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
});
