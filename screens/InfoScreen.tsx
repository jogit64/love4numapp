import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const { width, height } = Dimensions.get("window");

const InfoScreen = () => {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, fontError] = useFonts({
    hennypennyregular: require("../assets/fonts/hennypennyregular.ttf"),
    luckiestguyregular: require("../assets/fonts/luckiestguyregular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollView} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image
          source={require("../assets/love4nul_log3.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>
          Transformez vos mots en numéros de chance!
        </Text>
        <Text style={styles.para}>
          Avec notre algorithme unique basé sur le nombre d'or, convertissez
          l'amour, l'espoir, et la positivité en numéros porte-bonheur pour le
          Loto, l'Euromillions, et Eurodreams.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="heart" size={20} color="#FFFFFF" />
          {/* Icon inside the button */}
          <Text style={styles.buttonText}>Commencez à transformer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#0F052C",
    //marginBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: height,
    paddingTop: 40,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  title: {
    fontSize: 30,
    fontFamily: "hennypennyregular",
    color: "#FF48C4",
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 20,
  },
  para: {
    fontSize: 14,
    color: "#e0b0ff",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
  },
  button: {
    flexDirection: "row", // Ensure icon and text are in a row
    alignItems: "center", // Align items in the center
    marginTop: 20,
    backgroundColor: "#FF48C4",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: 10, // Add space between icon and text
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default InfoScreen;
