import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation"; // Assurez-vous d'importer votre composant de navigation

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
