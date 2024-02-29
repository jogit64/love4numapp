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

          // Retourne l'icône avec le bon nom
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#3d1961",
          position: "absolute",
          borderTopWidth: 0,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="LoveNumbers" component={LoveNumbersScreen} />
    </Tab.Navigator>
  );
}
