// Importez React et tout autre hook ou composant nécessaire depuis react ou react-native
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Définissez les props de votre composant si nécessaire
interface InfoScreenProps {
  // Exemple de prop
  exampleProp?: string;
}

// Définissez le composant en utilisant une fonction fléchée ou une fonction normale
const InfoScreen: React.FC<InfoScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Info Screen</Text>
      {/* Utilisez vos props comme nécessaire */}
      {props.exampleProp && <Text>{props.exampleProp}</Text>}
    </View>
  );
};

// Créez des styles pour votre composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Exportez votre composant pour pouvoir l'utiliser ailleurs dans votre application
export default InfoScreen;
