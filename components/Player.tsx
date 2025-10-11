import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

type PlayerProps = {
  preset: { sound: any };
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Player({ isPlaying, onToggle }: PlayerProps) {
  const pressScale = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPlaying) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }

    pulse.stopAnimation(() => {
      pulse.setValue(0);
    });
  }, [isPlaying, pulse]);

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 18,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const pulsingScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  });

  const pulseRingScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1.05, 1.25],
  });

  const pulseRingOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.18],
  });

  return (
    <View>
      <View style={styles.container}>
        <Animated.View style={styles.buttonWrapper}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pulseRing,
              {
                opacity: pulseRingOpacity,
                transform: [{ scale: pulseRingScale }],
              },
            ]}
          />
          <Pressable
            onPress={onToggle}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            hitSlop={16}
          >
            <Animated.View
              style={[
                styles.button,
                isPlaying && styles.playing,
                { transform: [{ scale: pulsingScale }, { scale: pressScale }] },
              ]}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={60}
                color={COLORS.panel}
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 130,
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
  pulseRing: {
    position: "absolute",
    width: 120,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
});
