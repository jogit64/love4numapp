import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Assurez-vous d'avoir installé @expo/vector-icons
import LoveNumbersScreen from "./screens/LoveNumbersScreen";
import InfoScreen from "./screens/InfoScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Ajustement des noms d'icône selon le nom de l'itinéraire
          if (route.name === "LoveNumbers") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Info") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          }

          //   if (route.name === "Info") {
          //     iconName = focused
          //  //     ? "information-circle"
          //       : "information-circle-outline";
          //   } else if (route.name === "LoveNumbers") {
          //     iconName = focused ? "heart" : "heart-outline";
          //   }

          // Retourne l'icône avec le bon nom
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Cache le texte de l'onglet
        tabBarStyle: {
          backgroundColor: "#3d1961", // Ajuste ici la couleur de fond souhaitée ou transparent
          position: "absolute", // Pour le style absolu si nécessaire
          borderTopWidth: 0, // Pour enlever la ligne en haut de la tabBar
          height: 60, // Ajuste la hauteur ici
        },
        headerShown: false, // Cache le titre en haut de chaque page
      })}
    >
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="LoveNumbers" component={LoveNumbersScreen} />
    </Tab.Navigator>
  );
}
