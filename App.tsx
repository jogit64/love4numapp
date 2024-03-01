//import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  SplashScreen.preventAutoHideAsync(); // Empêche le splash screen de disparaître automatiquement

  const [fontsLoaded, fontError] = useFonts({
    hennypennyregular: require("./assets/fonts/hennypennyregular.ttf"),
    luckiestguyregular: require("./assets/fonts/luckiestguyregular.ttf"),
    lemonregular: require("./assets/fonts/lemon-regular.ttf"),
    ralewaythin: require("./assets/fonts/Raleway-Thin.ttf"),
    robotoregular: require("./assets/fonts/roboto-regular.ttf"),
    roboto700: require("./assets/fonts/roboto-700.ttf"),
    ralewayextraBold: require("./assets/fonts/Raleway-ExtraBold.ttf"),
  });

  useEffect(() => {
    (async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Retourne un écran vide ou un indicateur de chargement ici si vous le souhaitez
  }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
