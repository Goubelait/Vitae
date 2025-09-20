import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: { sound: any };
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Player({ preset, isPlaying, onToggle }: PlayerProps) {
  const [audioError, setAudioError] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Configuration audio
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {}
    };
    configureAudio();
  }, []);

  // Charger le son
  useEffect(() => {
    if (!preset.sound) {
      setAudioError(true);
      return;
    }

    const loadSound = async () => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(preset.sound);
        setSound(newSound);
        setAudioError(false);
      } catch (error) {
        setAudioError(true);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [preset.sound]);

  // Contrôler la lecture
  useEffect(() => {
    if (!sound || audioError) return;

    const playSound = async () => {
      try {
        if (isPlaying) {
          await sound.playAsync();
        } else {
          await sound.pauseAsync();
          await sound.setPositionAsync(0);
        }
      } catch (error) {
        setAudioError(true);
      }
    };

    playSound();
  }, [isPlaying, sound, audioError]);

  // Gestion de la fin de lecture
  useEffect(() => {
    if (!sound) return;

    const onPlaybackStatusUpdate = (status: any) => {
      if (status.didJustFinish && isPlaying) {
        sound.setPositionAsync(0);
        sound.playAsync();
      }
    };

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, [sound, isPlaying]);

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={onToggle}
          style={[
            styles.button,
            isPlaying && styles.playing,
            audioError && styles.error,
          ]}
          disabled={audioError}
        >
          <Ionicons
            name={audioError ? "warning" : isPlaying ? "pause" : "play"}
            size={60}
            color={audioError ? "#ff4444" : COLORS.panel}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 140,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  playing: {
    backgroundColor: COLORS.accent + "98",
  },
  error: {
    backgroundColor: "#ff4444",
    opacity: 0.7,
  },
});
