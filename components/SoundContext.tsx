import { presetStyles } from "assets/PresetStyle";
import { Preset } from "assets/Types";
import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundContextType = {
  currentPreset: Preset | null;
  isPlaying: boolean;
  playPreset: (preset: Preset) => Promise<void>;
  togglePlay: () => Promise<void>;
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentPreset, setCurrentPreset] = useState<Preset | null>(
    presetStyles[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const playPreset = useCallback(
    async (preset: Preset, autoPlay: boolean = true) => {
      try {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(preset.sound, {
          shouldPlay: autoPlay,
          isLooping: true,
        });

        soundRef.current = sound;
        setCurrentPreset(preset);
        setIsPlaying(autoPlay);
      } catch (err) {
        console.warn("Audio error:", err);
      }
    },
    []
  );

  const togglePlay = useCallback(async () => {
    const sound = soundRef.current;
    if (!sound) return;

    try {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) {
        return;
      }

      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio toggle error:", err);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        if (!cancelled) {
          await playPreset(presetStyles[0], false);
        }
      } catch (err) {
        console.warn("Failed to configure audio: ", err);
      }
    };

    configureAudio();

    return () => {
      cancelled = true;
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => void 0);
        soundRef.current = null;
      }
    };
  }, [playPreset]);

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


