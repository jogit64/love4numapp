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
import LoveNumbers from "./LoveNumbersScreen";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const InfoScreen = () => {
  SplashScreen.preventAutoHideAsync();
  const navigation = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    hennypennyregular: require("../assets/fonts/hennypennyregular.ttf"),
    luckiestguyregular: require("../assets/fonts/luckiestguyregular.ttf"),
    lemonregular: require("../assets/fonts/lemon-regular.ttf"),
    ralewaythin: require("../assets/fonts/Raleway-Thin.ttf"),
    robotoregular: require("../assets/fonts/roboto-regular.ttf"),
    ralewayextraBold: require("../assets/fonts/Raleway-ExtraBold.ttf"),
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
        {/* <Text style={styles.title}>
          Transformez vos mots en numéros de chance!
        </Text> */}

        {/* Début de l'effet néon intégré */}
        <View style={styles.neonContainer}>
          <Text style={[styles.neonText, styles.shadow]}>
            {" "}
            Transformez vos mots en numéros de chance!
          </Text>
          <Text style={styles.neonText}>
            {" "}
            Transformez vos mots en numéros de chance!
          </Text>
        </View>
        {/* Fin de l'effet néon intégré */}

        <Text style={styles.para}>
          Avec notre algorithme unique basé sur le nombre d'or, convertissez
          l'amour, l'espoir, et la positivité en numéros porte-bonheur pour le
          Loto, l'Euromillions, et Eurodreams.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoveNumbers")}
        >
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
    //color: "#FF48C4",
    color: "#FFFB00",
    lineHeight: 40,
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 20,
  },

  para: {
    fontSize: 16,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
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

  neonContainer: {
    // styles du container si nécessaire
  },
  neonText: {
    fontSize: 30,
    fontFamily: "hennypennyregular",
    //color: "#FF48C4",
    color: "#FFFB00",
    lineHeight: 50,
    textAlign: "center",
  },
  shadow: {
    position: "absolute",
    textShadowColor: "#FF48C4", // Utilisez la même couleur pour l'ombre
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10, // Rayon de l'ombre pour l'effet glow
  },
});

export default InfoScreen;
