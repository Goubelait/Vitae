import { presetStyles } from "assets/PresetStyle";
import { Preset } from "assets/Types";
import { Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";

type SoundContextType = {
  currentPreset: Preset | null;
  isPlaying: boolean;
  playPreset: (preset: Preset) => Promise<void>;
  togglePlay: () => Promise<void>;
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentPreset, setCurrentPreset] = useState<Preset | null>(
    presetStyles[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const playPreset = async (preset: Preset, autoPlay: boolean = true) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(preset.sound, {
        shouldPlay: autoPlay,
        isLooping: true,
      });

      setSound(newSound);
      setCurrentPreset(preset);
      setIsPlaying(autoPlay);
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  useEffect(() => {
    const loadDefaultPreset = async () => {
      await playPreset(presetStyles[0], false);
    };
    loadDefaultPreset();
  }, []);

  const togglePlay = async () => {
    if (!sound) return;

    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return (
    <SoundContext.Provider
      value={{ currentPreset, isPlaying, playPreset, togglePlay }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
};
