import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoveNumbersScreen from "./screens/LoveNumbersScreen";
import InfoScreen from "./screens/InfoScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LoveNumbers" component={LoveNumbersScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  );
}
