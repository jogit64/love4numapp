// PrivacyPolicyScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicyScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Politique de Confidentialité</Text>
      <Text style={styles.text}>
        [Insérez ici le texte de votre politique de confidentialité...]
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0F052C",
  },
  title: {
    fontSize: 22,
    color: "#FFF",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;
