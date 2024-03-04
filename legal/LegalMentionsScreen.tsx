import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const LegalMentionsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mentions Légales</Text>
      <Text style={styles.text}>
        [Insérez ici les mentions légales de votre application...]
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

export default LegalMentionsScreen;
