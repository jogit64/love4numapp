import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomLoader = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Transformons vos espoirs en numéros de chance... L'alchimie opère !
    </Text>
    <Image
      source={require("../assets/simplelogolove4num.png")}
      style={styles.image}
      resizeMode="contain" // ou "contain", "stretch", "repeat", "center"
    />
    {/* Pour une animation avec Lottie, vous remplaceriez l'Image par un LottieView */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F052C",
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  image: {
    width: 100, // Ajustez selon votre image
    height: 100, // Ajustez selon votre image
  },
});

export default CustomLoader;
