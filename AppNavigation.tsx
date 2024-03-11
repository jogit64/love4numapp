import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import LoveNumbersScreen from "./screens/LoveNumbersScreen";
import InfoScreen from "./screens/InfoScreen";
import CreditsScreen from "./screens/CreditsScreen";
import LegalMentionsScreen from "./legal/LegalMentionsScreen";
import PrivacyPolicyScreen from "./legal/PrivacyPolicyScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Créez le Stack Navigator pour les écrans de crédits, mentions légales et politique de confidentialité
function LegalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Credits" component={CreditsScreen} />
      <Stack.Screen name="LegalMentions" component={LegalMentionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
}

// Configuration principale de la navigation par onglets de l'application
export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];
          if (route.name === "Accueil") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Jouer") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Crédits") {
            iconName = focused ? "card" : "card-outline";
          } else {
            iconName = "alert"; // Valeur par défaut au cas où aucun des cas ci-dessus ne correspond
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#0F052C" : "#B6B6B6"}
            />
          );
        },

        tabBarStyle: {
          backgroundColor: "#FF48C4",
          //   borderTopWidth: 1,
          // borderTopColor: "#FF48C4",
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
      <Tab.Screen name="Crédits" component={LegalStack} />
    </Tab.Navigator>
  );
}
