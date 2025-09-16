import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";

export default function EditScreenInfo() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Preset</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    marginHorizontal: 50,
  },
});
