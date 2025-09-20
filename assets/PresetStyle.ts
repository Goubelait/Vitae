// Import explicite des assets audio
const sleepSound = require("assets/sounds/sleep.mp3");
const relaxSound = require("assets/sounds/relax.mp3");
const createSound = require("assets/sounds/create.mp3");
const focusSound = require("assets/sounds/focus.mp3");

export const presetStyles = [
  {
    id: 1,
    name: "Sleep",
    icon: "bed",
    subtitle: "1Hz",
    sound: sleepSound,
  },
  {
    id: 2,
    name: "Relax",
    icon: "leaf",
    subtitle: "8Hz",
    sound: relaxSound,
  },
  {
    id: 3,
    name: "Create",
    icon: "eye",
    subtitle: "20Hz",
    sound: createSound,
  },
  {
    id: 4,
    name: "Focus",
    icon: "bulb",
    subtitle: "40Hz",
    sound: focusSound,
  },
];
