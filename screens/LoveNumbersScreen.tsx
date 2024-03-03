import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import AppStyles from "../styles/AppStyles";
import { StatusBar } from "expo-status-bar";
import seedrandom from "seedrandom";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

//import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LotoDisplay from "../components/LotoDisplay";
import EuromillionsDisplay from "../components/EuromillionsDisplay";
import CustomLoader from "../components/CustomLoader";

const { width, height } = Dimensions.get("window");

const Love4NumWidget = () => {
  // const [isReady, setIsReady] = useState(false);

  const handleReset = () => {
    setLotoNumbers([]); // Réinitialisez à un tableau vide ou la valeur initiale
    setLotoComplementaire(null); // Réinitialisez à null ou la valeur initiale
    setStatsNumeros([]); // Réinitialisez à un tableau vide ou la valeur initiale
    setChanceNumberStats(null); // Réinitialisez à null ou la valeur initiale
    setPhrase("");
  };

  const [phrase, setPhrase] = useState("");
  const [jeuSelectionne, setJeuSelectionne] = useState<string | null>(null);

  const [lotoNumbers, setLotoNumbers] = useState([]);
  const [lotoComplementaire, setLotoComplementaire] = useState(null);

  const [euromillionsNumbers, setEuromillionsNumbers] = useState([]);
  const [euromillionsEtoiles, setEuromillionsEtoiles] = useState([]);

  const [eurodreamsNumbers, setEurodreamsNumbers] = useState([]);
  const [eurodreamsDream, setEurodreamsDream] = useState(null);

  const [statsNumeros, setStatsNumeros] = useState([]);
  const [chanceNumberStats, setChanceNumberStats] = useState(null);
  const [statsNumerosEuromillions, setStatsNumerosEuromillions] = useState([]);
  const [statsEtoilesEuromillions, setStatsEtoilesEuromillions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const GameSelector = ({ onPress, imageSource, label, jeuId }) => (
    <TouchableOpacity
      onPress={() => {
        setJeuSelectionne(jeuId);
        onPress();
      }}
      style={[
        AppStyles.gameSelector,
        jeuSelectionne === jeuId
          ? AppStyles.selectedGame
          : AppStyles.unselectedGame,
      ]}
    >
      <Image source={imageSource} style={AppStyles.gameImage} />
      <Text style={AppStyles.gameLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const EtoileEuromillions = ({ numero }) => {
    return (
      <View style={AppStyles.etoileContainer}>
        <Image
          source={require("../assets/etoile5.png")}
          style={AppStyles.etoileBackground}
        />
        <Text style={AppStyles.etoileNumero}>{numero}</Text>
      </View>
    );
  };

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, fontError] = useFonts({
    hennypennyregular: require("../assets/fonts/hennypennyregular.ttf"),
    luckiestguyregular: require("../assets/fonts/luckiestguyregular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const genererNumerosUniques = (debut, fin, count) => {
    let numeros = new Set();
    while (numeros.size < count) {
      numeros.add(Math.floor(Math.random() * (fin - debut + 1)) + debut);
    }
    return [...numeros];
  };

  const NOMBRE_D_OR = 1.618033988749895;

  const genererNumerosLoto = async (jeu) => {
    setIsLoading(true);
    if (!phrase) {
      alert(
        "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
      );
      setIsLoading(false);
      return;
    }

    // Convertit la phrase en une graine basée sur la somme des codes de caractères
    const seedBase = [...phrase].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    // Ajuste la graine en utilisant le nombre d'or
    const seedAjustee = (seedBase * NOMBRE_D_OR) % 1; // Utilise le reste de la division pour garder un nombre entre 0 et 1

    const fetchStatsForNumber = async (numero, type, collectionName) => {
      try {
        const docRef = doc(db, collectionName, `${numero}_${type}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log("Statistiques non disponibles !");
          return null;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du document :", error);
        return null;
      }
    };

    switch (jeu) {
      case "loto":
        seedrandom(seedAjustee, { global: true });
        const numerosLoto = genererNumerosUniques(1, 49, 5);
        const numeroComplementaireLoto = Math.floor(Math.random() * 10) + 1;

        // Récupération des statistiques pour tous les numéros, y compris le numéro complémentaire
        const statsPromisesLoto = numerosLoto.map((numero) =>
          fetchStatsForNumber(numero, "principal", "lotoStats")
        );
        const statsChancePromiseLoto = fetchStatsForNumber(
          numeroComplementaireLoto,
          "chance",
          "lotoStats"
        );

        // Attendre que toutes les promesses se résolvent
        const resolvedStatsLoto = await Promise.all(statsPromisesLoto);
        const resolvedStatsChanceLoto = await statsChancePromiseLoto; // Pas besoin d'utiliser Promise.all pour une seule promesse

        // Mettre à jour tous les états en une seule opération pour éviter des rendus partiels
        setLotoNumbers(numerosLoto);
        setLotoComplementaire(numeroComplementaireLoto);
        setStatsNumeros(resolvedStatsLoto);
        setChanceNumberStats(resolvedStatsChanceLoto); // Directement assigné sans utiliser [0] puisque nous n'utilisons pas Promise.all ici
        setIsLoading(false);
        break;

      case "euromillions":
        seedrandom(seedAjustee, { global: true });
        const numerosEuromillions = genererNumerosUniques(1, 50, 5);
        const etoilesEuromillions = genererNumerosUniques(1, 12, 2);

        // Récupération des statistiques pour les numéros et étoiles d'Euromillions
        const statsNumerosPromises = numerosEuromillions.map((numero) =>
          fetchStatsForNumber(numero, "principal", "euromillionsStats")
        );
        const statsEtoilesPromises = etoilesEuromillions.map((etoile) =>
          fetchStatsForNumber(etoile, "chance", "euromillionsStats")
        );

        const resolvedStatsNumeros = await Promise.all(statsNumerosPromises);
        const resolvedStatsEtoiles = await Promise.all(statsEtoilesPromises);

        setEuromillionsNumbers(numerosEuromillions);
        setEuromillionsEtoiles(etoilesEuromillions);
        setStatsNumerosEuromillions(resolvedStatsNumeros);
        setStatsEtoilesEuromillions(resolvedStatsEtoiles);
        setIsLoading(false);
        break;
    }
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <ScrollView style={AppStyles.scrollView} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <View style={AppStyles.content}>
        <Image
          source={require("../assets/simplelogolove4num.png")}
          style={AppStyles.image}
          resizeMode="contain" // ou "contain", "stretch", "repeat", "center"
        />
        <Text style={AppStyles.para}>
          Entrez une phrase ou des mots d'amour pour voir comment l'univers
          transforme votre message en numéros de chance.
        </Text>
        <TextInput
          style={AppStyles.input}
          placeholder="Entrez votre phrase positive"
          placeholderTextColor="#e0b0ff"
          cursorColor={"#e0b0ff"}
          value={phrase}
          onChangeText={setPhrase}
        />
        <TouchableOpacity onPress={handleReset}>
          <MaterialIcons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={AppStyles.para}>
          Choisissez le tirage pour générer vos numéros d'amour !
        </Text>
        <View style={AppStyles.gameSelection}>
          <GameSelector
            onPress={() => genererNumerosLoto("loto")}
            imageSource={require("../assets/loto.png")}
            label="Loto"
            jeuId="loto" // Identifiant unique pour le jeu
          />
          <GameSelector
            onPress={() => genererNumerosLoto("euromillions")}
            imageSource={require("../assets/euromillions.png")}
            label="Euromillions"
            jeuId="euromillions" // Identifiant unique pour le jeu
          />
          <GameSelector
            onPress={() => genererNumerosLoto("eurodreams")}
            imageSource={require("../assets/dreams.png")}
            label="Eurodreams"
            jeuId="eurodreams" // Identifiant unique pour le jeu
          />
        </View>

        {/* //todo CHOIX LOTO */}
        {jeuSelectionne === "loto" &&
          lotoComplementaire &&
          chanceNumberStats && (
            <LotoDisplay
              lotoNumbers={lotoNumbers}
              lotoComplementaire={lotoComplementaire}
              statsNumeros={statsNumeros}
              chanceNumberStats={chanceNumberStats}
            />
          )}

        {/* //todo CHOIX EUROMILLIONS */}
        {jeuSelectionne === "euromillions" &&
          euromillionsNumbers.length > 0 && (
            <EuromillionsDisplay
              euromillionsNumbers={euromillionsNumbers}
              euromillionsEtoiles={euromillionsEtoiles}
              statsNumeros={statsNumerosEuromillions} // Utilisez le nom correct de l'état
              statsEtoiles={statsEtoilesEuromillions} // Utilisez le nom correct de l'état
            />
          )}

        {/* {jeuSelectionne === "euromillions" && (
          <View>
            <Text style={AppStyles.textTirage}>
              Vos numéros pour l'Euromillions
            </Text>
            <View style={{ flexDirection: "row" }}>
              {euromillionsNumbers.map((num, index) => (
                <View key={index} style={AppStyles.euromillionsNumeros}>
                  <Text style={{ color: "#ffffff" }}>{num}</Text>
                </View>
              ))}
              {euromillionsEtoiles.map((etoile, index) => (
                <EtoileEuromillions key={index} numero={etoile} />
              ))}
            </View>
          </View>
        )} */}

        {jeuSelectionne === "eurodreams" && (
          <View>
            <Text style={AppStyles.textTirage}>
              Vos numéros pour l'Eurodreams
            </Text>
            <View style={{ flexDirection: "row" }}>
              {eurodreamsNumbers.map((num, index) => (
                <View key={index} style={AppStyles.eurodreamsNumeros}>
                  <Text style={{ color: "#ffffff" }}>{num}</Text>
                </View>
              ))}
              {eurodreamsDream && (
                <View style={AppStyles.eurodreamsDream}>
                  <Text style={{ color: "#ffffff" }}>{eurodreamsDream}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   flex: 1,
  //   //backgroundColor: "#fb21ff", // Un fond violet vif pour l'énergie
  //   backgroundColor: "#0F052C", // Un fond violet vif pour l'énergie
  //   marginBottom: 40,
  // },
  // content: {
  //   flexGrow: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   minHeight: height,
  //   //padding: 20,
  //   paddingTop: 10,
  // },
  // image: {
  //   width: width * 0.6,
  //   height: height * 0.1,
  //   // width: 80,
  //   // height: 80,
  //   //backgroundColor: "#ccc",
  //   marginTop: 50,
  //   marginBottom: 20,
  // },
  // title: {
  //   fontSize: 26,
  //   fontFamily: "hennypennyregular",
  //   //color: "#FFEB3B",
  //   color: "#e0b0ff",
  //   textAlign: "center",
  //   // marginBottom: 5,
  //   //marginTop: 5,
  // },
  // para: {
  //   fontSize: 16,
  //   //fontFamily: "lemonregular",
  //   //fontFamily: "ralewaythin",
  //   //fontFamily: "ralewayextraBold",
  //   fontFamily: "robotoregular",
  //   //color: "#e0b0ff",
  //   color: "#fff",
  //   textAlign: "center",
  //   marginBottom: 15,
  //   marginTop: 5,
  //   marginHorizontal: 20,
  //   lineHeight: 25,
  // },
  // input: {
  //   width: width - 40,
  //   padding: 10,
  //   marginBottom: 20,
  //   color: "#e0b0ff",
  //   //borderRadius: 25,
  //   backgroundColor: "#1b1138",
  //   borderBottomWidth: 0.2,
  //   borderBottomColor: "#bfa2cb",
  //   textAlign: "center",
  // },
  // textTirage: {
  //   fontSize: 16,
  //   //fontFamily: "hennypennyregular",
  //   fontFamily: "robotoregular",
  //   //color: "#FFEB3B",
  //   color: "#FFF",
  //   textAlign: "center",
  //   marginBottom: 5,
  //   marginTop: 25,
  //   marginHorizontal: 20,
  // },
  // gameSelection: {
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  //   width: "100%",
  //   height: 80,
  // },
  // gameSelector: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   //backgroundColor: "#00E676",
  //   //padding: 10,
  //   paddingHorizontal: 6,
  //   borderRadius: 15,
  // },
  // gameImage: {
  //   width: 100,
  //   height: 55,
  //   resizeMode: "contain",
  // },
  // gameLabel: {
  //   color: "#0F052C",
  //   fontSize: 12,
  // },
  //   result: {
  //     marginTop: 20,
  //     fontSize: 18,
  //     color: "#FFEB3B",
  //     fontWeight: "bold",
  //     padding: 10,
  //   },
  // selectedGame: {
  //   backgroundColor: "#ADD8E6", // Bleu clair pour le jeu sélectionné
  //   // Autres styles nécessaires pour un jeu sélectionné
  // },
  // unselectedGame: {
  //   backgroundColor: "#00E676", // Vert (ou tout autre couleur de votre choix) pour les jeux non sélectionnés
  //   // Autres styles nécessaires pour un jeu non sélectionné
  // },
  // lotoNumeros: {
  //   backgroundColor: "#00a2d9", // --loto-bg-color
  //   color: "#ffffff",
  //   borderRadius: 20, // Pour obtenir un cercle parfait, assurez-vous que width et height sont égaux et borderRadius est la moitié
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // lotoComplementaire: {
  //   backgroundColor: "#ea3946", // --loto-complementary-bg-color
  //   color: "#ffffff",
  //   borderRadius: 20,
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // // Styles pour les numéros de l'Euromillions
  // euromillionsNumeros: {
  //   backgroundColor: "#001367", // --euromillions-bg-color
  //   color: "#ffffff",
  //   borderRadius: 20,
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // etoileContainer: {
  //   width: 50, // Ajustez la taille selon votre design
  //   height: 50, // Ajustez la taille selon votre design
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "relative",
  // },
  // etoileBackground: {
  //   width: "100%",
  //   height: "100%",
  //   position: "absolute", // Permet au texte de s'afficher au-dessus de l'image
  // },
  // etoileNumero: {
  //   color: "#ffffff", // Ajustez la couleur du texte si nécessaire
  //   fontWeight: "bold",
  //   fontSize: 20, // Ajustez la taille du texte selon votre design
  // },
  // // Styles pour les numéros de l'Eurodreams
  // eurodreamsNumeros: {
  //   backgroundColor: "#781ea6", // --eurodreams-bg-color
  //   color: "#ffffff",
  //   borderRadius: 20,
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // eurodreamsDream: {
  //   backgroundColor: "#ff3c69", // --eurodreams-dream-bg-color
  //   color: "#ffffff",
  //   borderRadius: 20,
  //   padding: 10,
  //   margin: 5,
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // lotoNumeroContainer: {
  //   alignItems: "center",
  //   margin: 5, // Ajustez selon votre mise en page
  // },
  // lotoStatistiques: {
  //   // Styles pour le texte des statistiques
  // },
  // lotoComplementaireContainer: {
  //   alignItems: "center",
  //   margin: 5, // Ajustez selon votre mise en page
  // },
  // statBloc: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-around",
  //   marginBottom: 60,
  // },
  // statExplanation: {
  //   color: "grey",
  //   fontFamily: "robotoregular",
  //   fontSize: 14,
  //   //color: "#FFEB3B",
  //   textAlign: "center",
  //   marginBottom: 5,
  // },
  // cardContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-around",
  // },
  // card: {
  //   backgroundColor: "#fe64f7",
  //   borderRadius: 10,
  //   padding: 10,
  //   //margin: 5,
  //   flexBasis: "30%",
  //   margin: "1%",
  //   alignItems: "center",
  // },
  // cardChance: {
  //   backgroundColor: "#ccc",
  //   borderRadius: 10,
  //   padding: 10,
  //   //margin: 5,
  //   flexBasis: "30%",
  //   margin: "1%",
  //   alignItems: "center",
  // },
  // number: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  // chanceNumber: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  // stats: {
  //   marginTop: 5,
  // },
  // statText: {
  //   fontSize: 14,
  //   fontFamily: "robotoregular",
  // },
  // legend: {
  //   marginTop: 20,
  //   alignItems: "center",
  // },
  // legendItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 5,
  // },
  // legendText: {
  //   marginLeft: 10,
  //   color: "#ffffff",
  //   fontSize: 16,
  // },
});

export default Love4NumWidget;
