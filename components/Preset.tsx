import { Ionicons } from "@expo/vector-icons";
import { Preset } from "assets/Types";
import { COLORS } from "constants/Colors";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text } from "react-native";

type PresetProps = {
  preset: Preset;
  isSelected?: boolean;
  onPress?: () => void;
};

const PresetList = ({ preset, isSelected, onPress }: PresetProps) => {
  const intro = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;
  const selectionPulse = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const releaseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSelectedRef = useRef(isSelected);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    return () => {
      if (releaseTimeout.current) {
        clearTimeout(releaseTimeout.current);
      }
    };
  }, []);

  const introDelay = useMemo(() => (preset.id % 5) * 60, [preset.id]);

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 350,
      delay: introDelay,
      useNativeDriver: true,
    }).start();
  }, [intro, introDelay]);

  const isActive = isSelected || pressed;

  useEffect(() => {
    isSelectedRef.current = isSelected;
    if (isSelected && pressed) {
      if (releaseTimeout.current) {
        clearTimeout(releaseTimeout.current);
        releaseTimeout.current = null;
      }
      setPressed(false);
    }
  }, [isSelected, pressed]);

  useEffect(() => {
    Animated.timing(selectionPulse, {
      toValue: isActive ? 1 : 0,
      duration: isActive ? 200 : 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isActive, selectionPulse]);

  const handlePressIn = () => {
    if (releaseTimeout.current) {
      clearTimeout(releaseTimeout.current);
    }
    setPressed(true);
    Animated.spring(press, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    if (releaseTimeout.current) {
      clearTimeout(releaseTimeout.current);
    }
    Animated.spring(press, {
      toValue: 0,
      useNativeDriver: true,
      speed: 22,
      bounciness: 6,
    }).start();

    releaseTimeout.current = setTimeout(() => {
      if (!isSelectedRef.current) {
        setPressed(false);
      }
    }, 180);
  };

  const wrapperScale = intro.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const pressScale = press.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });

  const selectionScale = selectionPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04],
  });

  const cardBackground = isActive ? COLORS.accent + "22" : COLORS.panel + "AA";
  const cardBorder = isActive ? COLORS.accent : COLORS.border;
  const cardShadowColor = isActive ? COLORS.accent : "#000";
  const cardShadowOpacity = isActive ? 0.35 : 0.2;

  return (
    <Animated.View
      style={[
        styles.presetWrapper,
        {
          opacity: intro,
          transform: [{ scale: wrapperScale }, { scale: pressScale }, { scale: selectionScale }],
        },
      ]}
    >
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={12}
      >
        <Animated.View
          style={[
            styles.preset,
            {
              borderColor: cardBorder,
              backgroundColor: cardBackground,
              shadowColor: cardShadowColor,
              shadowOpacity: cardShadowOpacity,
            },
          ]}
        >
          <Ionicons
            style={styles.presetIcon}
            name={preset.icon as any}
            size={24}
            color={isSelected ? COLORS.accent : COLORS.text}
          />
          <Text style={styles.presetName}>{preset.name}</Text>
          <Text style={styles.presetSubtitle}>{preset.subtitle}</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};
export default PresetList;

const styles = StyleSheet.create({
  presetWrapper: {
    width: "45%",
    marginVertical: 8,
    alignItems: "center",
  },
  pressable: {
    width: "100%",
    alignItems: "center",
  },
  preset: {
    height: 150,
    aspectRatio: 1,
    marginHorizontal: 0,
    borderRadius: 24,
    backgroundColor: COLORS.panel + "AA",
    borderColor: COLORS.border,
    borderWidth: 2,
    justifyContent: "flex-end",
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  presetIcon: {
    color: COLORS.text,
    position: "absolute",
    top: 16,
    left: 16,
    fontSize: 38,
  },
  presetName: {
    fontFamily: "Inter_700Bold",
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 4,
    fontWeight: "bold",
    maxWidth: 170,
  },
  presetSubtitle: {
    fontFamily: "Inter_400Regular",
    color: COLORS.subtext,
    fontSize: 14,
  },
});
