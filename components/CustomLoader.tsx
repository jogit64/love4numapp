import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const CustomLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#FF48C4" />
    {/* Taille et couleur personnalisables */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F052C",
  },
});

export default CustomLoader;
