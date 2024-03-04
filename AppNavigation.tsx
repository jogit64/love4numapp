import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoveNumbersScreen from "./screens/LoveNumbersScreen";
import InfoScreen from "./screens/InfoScreen";
import CreditsScreen from "./screens/CreditsScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#0F052C" : "#B6B6B6"; // Exemple de changement de couleur

          if (route.name === "Jouer") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline"; // Changement pour une icône d'accueil
          } else if (route.name === "Crédits") {
            iconName = focused ? "card" : "card-outline"; // Assurez-vous que ces noms d'icônes existent dans Ionicons
          }

          // Utilisez iconColor pour la couleur
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarStyle: {
          backgroundColor: "#FF48C4",
          position: "absolute",
          borderTopWidth: 1,
          borderTopColor: "#FF48C4",
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: "#fff",
          marginBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={InfoScreen} />
      <Tab.Screen name="Jouer" component={LoveNumbersScreen} />
      <Tab.Screen name="Crédits" component={CreditsScreen} />
    </Tab.Navigator>
  );
}
