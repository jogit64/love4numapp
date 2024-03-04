// Dans un fichier nommé CreditsScreen.js sous le dossier screens
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CreditsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informations sur les crédits</Text>

      <View style={styles.para3Bloc}></View>
      <View style={styles.lienBloc}>
        <TouchableOpacity onPress={() => navigation.navigate("Jouer")}>
          <Text style={styles.lien}>Politique de confidentialité</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  para3Bloc: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    //minHeight: height,
    marginBottom: 95,
  },
  lienBloc: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //minHeight: height,
    marginBottom: 95,
  },
  para2b: {
    fontSize: 14,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
  },
  lien: {
    fontSize: 11,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#CCC",
    textAlign: "center",
    //textDecoration: "underline",
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
  },
});

export default CreditsScreen;
