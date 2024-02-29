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
import { StatusBar } from "expo-status-bar";
import seedrandom from "seedrandom";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

import { calculateDaysBetweenDates } from "../utils/dateUtils";
import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const Love4NumWidget = () => {
  // const [isReady, setIsReady] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [jeuSelectionne, setJeuSelectionne] = useState<string | null>(null);

  const [lotoNumbers, setLotoNumbers] = useState([]);
  const [lotoComplementaire, setLotoComplementaire] = useState(null);

  const [euromillionsNumbers, setEuromillionsNumbers] = useState([]);
  const [euromillionsEtoiles, setEuromillionsEtoiles] = useState([]);

  const [eurodreamsNumbers, setEurodreamsNumbers] = useState([]);
  const [eurodreamsDream, setEurodreamsDream] = useState(null);
  const [statsNumeros, setStatsNumeros] = useState([]);

  const GameSelector = ({ onPress, imageSource, label, jeuId }) => (
    <TouchableOpacity
      onPress={() => {
        setJeuSelectionne(jeuId);
        onPress();
      }}
      style={[
        styles.gameSelector,
        jeuSelectionne === jeuId ? styles.selectedGame : styles.unselectedGame,
      ]}
    >
      <Image source={imageSource} style={styles.gameImage} />
      <Text style={styles.gameLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const EtoileEuromillions = ({ numero }) => {
    return (
      <View style={styles.etoileContainer}>
        <Image
          source={require("../assets/etoile5.png")}
          style={styles.etoileBackground}
        />
        <Text style={styles.etoileNumero}>{numero}</Text>
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
    if (!phrase) {
      alert(
        "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
      );
      return;
    }

    // Convertit la phrase en une graine basée sur la somme des codes de caractères
    const seedBase = [...phrase].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    // Ajuste la graine en utilisant le nombre d'or
    const seedAjustee = (seedBase * NOMBRE_D_OR) % 1; // Utilise le reste de la division pour garder un nombre entre 0 et 1

    const fetchStatsForNumber = async (numero, type) => {
      try {
        const docRef = doc(db, "lotoStats", `${numero}_${type}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          return docSnap.data();
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        return null; // Gérer l'erreur comme vous le souhaitez
      }
    };

    switch (jeu) {
      case "loto":
        seedrandom(seedAjustee, { global: true });
        const numerosLoto = genererNumerosUniques(1, 49, 5);

        // Assurez-vous d'utiliser Promise.all pour récupérer les statistiques de tous les numéros générés
        const statsPromises = numerosLoto.map((numero) =>
          fetchStatsForNumber(numero, "principal")
        );
        const resolvedStats = await Promise.all(statsPromises);

        const numeroComplementaireLoto = Math.floor(Math.random() * 10) + 1;
        setLotoNumbers(numerosLoto);
        setLotoComplementaire(numeroComplementaireLoto);
        setStatsNumeros(resolvedStats);
        break;
      case "euromillions":
        seedrandom(seedAjustee, { global: true });
        const numerosEuromillions = genererNumerosUniques(1, 50, 5);
        const etoilesEuromillions = genererNumerosUniques(1, 12, 2);
        setEuromillionsNumbers(numerosEuromillions);
        setEuromillionsEtoiles(etoilesEuromillions);
        break;
      case "eurodreams":
        seedrandom(seedAjustee, { global: true });
        const numerosEurodreams = genererNumerosUniques(1, 40, 6);
        const numeroDreamEurodreams = Math.floor(Math.random() * 5) + 1;
        setEurodreamsNumbers(numerosEurodreams);
        setEurodreamsDream(numeroDreamEurodreams);
        break;
    }
  };

  return (
    <ScrollView style={styles.scrollView} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image
          source={require("../assets/simplelogolove4num.png")}
          style={styles.image}
          resizeMode="contain" // ou "contain", "stretch", "repeat", "center"
        />
        <Text style={styles.para}>
          Entrez une phrase ou des mots d'amour pour voir comment l'univers
          transforme votre message en numéros de chance.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre phrase positive"
          placeholderTextColor="#e0b0ff"
          cursorColor={"#e0b0ff"}
          value={phrase}
          onChangeText={setPhrase}
        />
        <Text style={styles.para}>
          Choisissez le tirage pour générer vos numéros d'amour !
        </Text>
        <View style={styles.gameSelection}>
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
        {/* {result && <Text style={styles.result}>{result}</Text>} */}
        {/* Affichage conditionnel en fonction du jeu sélectionné */}
        {/* VERSION 0 sans stats */}
        {jeuSelectionne === "loto" && (
          // <View style={{ alignItems: "center", marginTop: 20 }}>
          <View>
            <Text style={styles.textTirage}>Vos numéros pour le Loto</Text>
            <View style={{ flexDirection: "row" }}>
              {lotoNumbers.map((num, index) => (
                <View key={index} style={styles.lotoNumeros}>
                  <Text style={{ color: "#ffffff" }}>{num}</Text>
                </View>
              ))}
              {lotoComplementaire && (
                <View style={styles.lotoComplementaire}>
                  <Text style={{ color: "#ffffff" }}>{lotoComplementaire}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* STATISTIQUES */}
        {jeuSelectionne === "loto" && (
          <View style={styles.statBloc}>
            <Text style={styles.textTirage}>Vos Statistiques de Chance</Text>
            <Text style={styles.statExplanation}>
              Basé sur les tirages depuis le 4 novembre 2019.
            </Text>

            <View style={styles.cardContainer}>
              {lotoNumbers.map((num, index) => (
                <View key={index} style={styles.card}>
                  {/* Numéro */}
                  <Text style={styles.number}>{num}</Text>

                  {/* Statistiques */}
                  <View style={styles.stats}>
                    {/* Dernière sortie */}
                    <View style={styles.statItem}>
                      <MaterialIcons name="history" size={20} color="#ffffff" />
                      <Text style={styles.statText}>
                        {statsNumeros[index]?.derniereSortie
                          ? `${calculateExactDrawsSinceLastOut(
                              statsNumeros[index]?.derniereSortie
                            )} tirages`
                          : "Données non disponibles"}
                      </Text>
                    </View>

                    {/* Pourcentage de sorties */}
                    <View style={styles.statItem}>
                      <MaterialIcons
                        name="pie-chart"
                        size={20}
                        color="#ffffff"
                      />
                      <Text style={styles.statText}>
                        {statsNumeros[index]?.pourcentageDeSorties}%
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Légende pour les icônes */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <MaterialIcons name="history" size={20} color="#ffffff" />
                <Text style={styles.legendText}>Dernière sortie</Text>
              </View>
              <View style={styles.legendItem}>
                <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                <Text style={styles.legendText}>% de sorties</Text>
              </View>
            </View>
          </View>
        )}

        {jeuSelectionne === "euromillions" && (
          <View>
            <Text style={styles.textTirage}>
              Vos numéros pour l'Euromillions
            </Text>
            <View style={{ flexDirection: "row" }}>
              {euromillionsNumbers.map((num, index) => (
                <View key={index} style={styles.euromillionsNumeros}>
                  <Text style={{ color: "#ffffff" }}>{num}</Text>
                </View>
              ))}
              {euromillionsEtoiles.map((etoile, index) => (
                <EtoileEuromillions key={index} numero={etoile} />
              ))}
            </View>
          </View>
        )}
        {jeuSelectionne === "eurodreams" && (
          <View>
            <Text style={styles.textTirage}>Vos numéros pour l'Eurodreams</Text>
            <View style={{ flexDirection: "row" }}>
              {eurodreamsNumbers.map((num, index) => (
                <View key={index} style={styles.eurodreamsNumeros}>
                  <Text style={{ color: "#ffffff" }}>{num}</Text>
                </View>
              ))}
              {eurodreamsDream && (
                <View style={styles.eurodreamsDream}>
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
  scrollView: {
    flex: 1,
    //backgroundColor: "#fb21ff", // Un fond violet vif pour l'énergie
    backgroundColor: "#0F052C", // Un fond violet vif pour l'énergie
    marginBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: height,
    //padding: 20,
    paddingTop: 10,
  },

  image: {
    width: width * 0.6,
    height: height * 0.1,
    // width: 80,
    // height: 80,
    //backgroundColor: "#ccc",
    marginTop: 50,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontFamily: "hennypennyregular",
    //color: "#FFEB3B",
    color: "#e0b0ff",
    textAlign: "center",
    // marginBottom: 5,
    //marginTop: 5,
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
    marginBottom: 15,
    marginTop: 5,
    marginHorizontal: 20,
    lineHeight: 25,
  },

  input: {
    width: width - 40,
    padding: 10,
    marginBottom: 20,
    color: "#e0b0ff",
    //borderRadius: 25,
    backgroundColor: "#1b1138",
    borderBottomWidth: 0.2,
    borderBottomColor: "#bfa2cb",
    textAlign: "center",
  },
  //   instruction: {
  //     fontSize: 14,
  //     // fontFamily: "hennypennyregular",
  //     //color: "#FFEB3B",
  //     color: "#e0b0ff",
  //     textAlign: "center",
  //     marginBottom: 15,
  //     marginTop: 5,
  //     marginHorizontal: 20,
  //   },

  textTirage: {
    fontSize: 16,
    //fontFamily: "hennypennyregular",
    fontFamily: "robotoregular",
    //color: "#FFEB3B",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 25,
    marginHorizontal: 20,
  },
  gameSelection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 80,
  },

  gameSelector: {
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#00E676",
    //padding: 10,
    paddingHorizontal: 6,
    borderRadius: 15,
  },

  gameImage: {
    width: 100,
    height: 55,
    resizeMode: "contain",
  },

  gameLabel: {
    color: "#0F052C",
    fontSize: 12,
  },

  result: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFEB3B",
    fontWeight: "bold",
    padding: 10,
  },

  selectedGame: {
    backgroundColor: "#ADD8E6", // Bleu clair pour le jeu sélectionné
    // Autres styles nécessaires pour un jeu sélectionné
  },

  unselectedGame: {
    backgroundColor: "#00E676", // Vert (ou tout autre couleur de votre choix) pour les jeux non sélectionnés
    // Autres styles nécessaires pour un jeu non sélectionné
  },

  lotoNumeros: {
    backgroundColor: "#00a2d9", // --loto-bg-color
    color: "#ffffff",
    borderRadius: 20, // Pour obtenir un cercle parfait, assurez-vous que width et height sont égaux et borderRadius est la moitié
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  lotoComplementaire: {
    backgroundColor: "#ea3946", // --loto-complementary-bg-color
    color: "#ffffff",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  // Styles pour les numéros de l'Euromillions
  euromillionsNumeros: {
    backgroundColor: "#001367", // --euromillions-bg-color
    color: "#ffffff",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  etoileContainer: {
    width: 50, // Ajustez la taille selon votre design
    height: 50, // Ajustez la taille selon votre design
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  etoileBackground: {
    width: "100%",
    height: "100%",
    position: "absolute", // Permet au texte de s'afficher au-dessus de l'image
  },
  etoileNumero: {
    color: "#ffffff", // Ajustez la couleur du texte si nécessaire
    fontWeight: "bold",
    fontSize: 20, // Ajustez la taille du texte selon votre design
  },

  // Styles pour les numéros de l'Eurodreams
  eurodreamsNumeros: {
    backgroundColor: "#781ea6", // --eurodreams-bg-color
    color: "#ffffff",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  eurodreamsDream: {
    backgroundColor: "#ff3c69", // --eurodreams-dream-bg-color
    color: "#ffffff",
    borderRadius: 20,
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  lotoNumeroContainer: {
    alignItems: "center",
    margin: 5, // Ajustez selon votre mise en page
  },
  lotoStatistiques: {
    // Styles pour le texte des statistiques
  },
  lotoComplementaireContainer: {
    alignItems: "center",
    margin: 5, // Ajustez selon votre mise en page
  },

  statBloc: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 60,
  },

  statExplanation: {
    color: "grey",
    fontFamily: "robotoregular",
    fontSize: 14,
    //color: "#FFEB3B",
    textAlign: "center",
    marginBottom: 5,
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#fe64f7",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stats: {
    marginTop: 5,
  },
  statText: {
    fontSize: 14,
    fontFamily: "robotoregular",
  },
  legend: {
    marginTop: 20,
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendText: {
    marginLeft: 10,
    color: "#ffffff",
    fontSize: 16,
  },
});

export default Love4NumWidget;
