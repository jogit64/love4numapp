import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

import { JouerScreenNavigationProp } from "../NavigationTypes";

// Props du composant incluant le type de navigation
type Props = {
  navigation: JouerScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");

const InfoScreen: React.FC<Props> = ({ navigation }) => {
  // SplashScreen.preventAutoHideAsync();
  //const navigation = useNavigation();

  //   const [fontsLoaded, fontError] = useFonts({
  //     hennypennyregular: require("../assets/fonts/hennypennyregular.ttf"),
  //     luckiestguyregular: require("../assets/fonts/luckiestguyregular.ttf"),
  //     lemonregular: require("../assets/fonts/lemon-regular.ttf"),
  //     ralewaythin: require("../assets/fonts/Raleway-Thin.ttf"),
  //     robotoregular: require("../assets/fonts/roboto-regular.ttf"),
  //     roboto700: require("../assets/fonts/roboto-700.ttf"),
  //     ralewayextraBold: require("../assets/fonts/Raleway-ExtraBold.ttf"),
  //   });

  //   const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded || fontError) {
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [fontsLoaded, fontError]);

  //   if (!fontsLoaded && !fontError) {
  //     return null;
  //   }

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image
          source={require("../assets/love4nul_log3.png")}
          style={styles.image}
          resizeMode="cover"
        />
        {/* <Text style={styles.title}>
          Transformez vos mots en numéros de chance!
        </Text> */}

        {/* Début de l'effet néon intégré */}
        <View style={styles.neonContainer}>
          <Text style={[styles.neonText, styles.shadow]}>
            {" "}
            Transformez vos mots en numéros de chance!
          </Text>
          <Text style={styles.neonText}>
            {" "}
            Transformez vos mots en numéros de chance!
          </Text>
        </View>
        {/* Fin de l'effet néon intégré */}

        <Text style={styles.para}>
          Avec notre algorithme unique basé sur le nombre d'or, convertissez
          l'amour, l'espoir, et la positivité en numéros porte-bonheur pour des
          jeux de loteries françaises.
        </Text>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Tirage classique</Text>
          <Text style={styles.para2b}>5 numéros (1 - 49)</Text>
          <Text style={styles.para2b}>1 numéros complémentaire (1 - 10)</Text>
        </View>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Tirage européen</Text>
          <Text style={styles.para2b}>5 numéros (1 - 50)</Text>
          <Text style={styles.para2b}>2 numéros complémentaires (1 - 12)</Text>
        </View>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Tirage rêves</Text>
          <Text style={styles.para2b}>6 numéros (1 - 40)</Text>
          <Text style={styles.para2b}>1 numéros complémentaires (1 - 5)</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Jouer")}
        >
          <Ionicons name="heart" size={20} color="#FFFFFF" />
          {/* Icon inside the button */}
          <Text style={styles.buttonText}>C'est parti !</Text>
        </TouchableOpacity>

        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Vibrations Positives</Text>
          <Text style={styles.para2b}>
            Convertissez l’énergie de mots empreints d’amour, d’espoir, et de
            positivité en numéros porte-bonheur.
          </Text>
        </View>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Intention Puissante</Text>
          <Text style={styles.para2b}>
            Utilisez des déclarations d’amour, noms de proches, ou tout mot
            inspirant bonheur et gratitude.
          </Text>
        </View>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Algorithme Unique</Text>
          <Text style={styles.para2b}>
            Notre système utilise vos intentions, combinées à la magie du nombre
            d’or, pour créer des numéros pour le Loto, l’Euromillions, et
            Eurodreams.
          </Text>
        </View>
        <View style={styles.para2Bloc}>
          <Text style={styles.para2r}>Le Nombre d’Or</Text>
          <Text style={styles.para2b}>
            Intégré dans notre algorithme, ce ratio mathématique mythique est
            réputé pour attirer la chance et l’harmonie, ajoutant une dimension
            supplémentaire de magie à vos numéros. Facile à Utiliser : Entrez
            simplement votre phrase et choisissez votre jeu. Notre algorithme
            fait le reste, en espérant transformer positivité et amour en
            fortune.
          </Text>
        </View>
        {/* <View style={styles.para3Bloc}> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Jouer")}
        >
          <Ionicons name="heart" size={20} color="#FFFFFF" />
          {/* Icon inside the button */}
          <Text style={styles.buttonText}>C'est parti !</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#0F052C",
    //marginBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: height,
    paddingTop: 40,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
  },
  title: {
    fontSize: 30,
    fontFamily: "hennypennyregular",
    //color: "#FF48C4",
    color: "#FFFB00",
    lineHeight: 40,
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 20,
  },

  para: {
    fontSize: 16,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#fff",
    textAlign: "center",
    // marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
  },
  button: {
    flexDirection: "row", // Ensure icon and text are in a row
    alignItems: "center", // Align items in the center
    marginTop: 60,
    backgroundColor: "#FF48C4",
    padding: 10,
    borderRadius: 20,
    marginBottom: 35,
  },
  buttonText: {
    marginLeft: 10, // Add space between icon and text
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  para2Bloc: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    //minHeight: height,
    paddingTop: 25,
  },
  para2r: {
    fontSize: 14,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#FF48C4",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
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
    // marginBottom: 15,
    // marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
  },
  para2bn: {
    fontSize: 14,
    //fontFamily: "lemonregular",
    //fontFamily: "ralewaythin",
    //fontFamily: "ralewayextraBold",
    fontFamily: "robotoregular",
    //color: "#e0b0ff",
    color: "#FFF",
    textAlign: "center",

    marginHorizontal: 20,
    lineHeight: 25,
  },

  neonContainer: {
    // styles du container si nécessaire
  },
  neonText: {
    fontSize: 30,
    fontFamily: "hennypennyregular",
    //color: "#FF48C4",
    color: "#FFFB00",
    lineHeight: 50,
    textAlign: "center",
  },
  shadow: {
    position: "absolute",
    textShadowColor: "#FF48C4", // Utilisez la même couleur pour l'ombre
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10, // Rayon de l'ombre pour l'effet glow
  },
});

export default InfoScreen;
