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
import EurodreamsDisplay from "../components/EurodreamsDisplay";
import CustomLoader from "../components/CustomLoader";

const { width, height } = Dimensions.get("window");

const Love4NumWidget = () => {
  const handleReset = () => {
    // Réinitialisation pour le Loto
    setLotoNumbers([]);
    setLotoComplementaire(null);
    setStatsNumeros([]);
    setChanceNumberStats(null);
    setJeuSelectionne(null);

    // Réinitialisation pour Euromillions
    setEuromillionsNumbers([]);
    setEuromillionsEtoiles([]);
    setStatsNumerosEuromillions([]);
    setStatsEtoilesEuromillions([]);

    // Réinitialisation pour Eurodreams
    setEurodreamsNumbers([]);
    setEurodreamsDream(null);
    setStatsNumerosEurodreams([]);
    setStatsDream(null);

    // Réinitialiser la phrase saisie par l'utilisateur
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
  const [statsNumerosEurodreams, setStatsNumerosEurodreams] = useState([]);
  const [statsDream, setStatsDream] = useState(null);

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

      case "eurodreams":
        try {
          seedrandom(seedAjustee, { global: true });
          const numerosEurodreams = genererNumerosUniques(1, 40, 6);
          const numeroDreamEurodreams = Math.floor(Math.random() * 5) + 1;

          const statsNumerosPromisesEurodreams = numerosEurodreams.map(
            (numero) =>
              fetchStatsForNumber(numero, "principal", "eurodreamsStats")
          );
          const statsDreamPromise = fetchStatsForNumber(
            numeroDreamEurodreams,
            "chance",
            "eurodreamsStats"
          );

          const resolvedStatsNumerosEurodreams = await Promise.all(
            statsNumerosPromisesEurodreams
          );
          const resolvedStatsDream = await statsDreamPromise;

          setEurodreamsNumbers(numerosEurodreams);
          setEurodreamsDream(numeroDreamEurodreams);
          setStatsNumerosEurodreams(resolvedStatsNumerosEurodreams);
          setStatsDream(resolvedStatsDream);
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la récupération des statistiques : ",
            error
          );
        } finally {
          setIsLoading(false); // Assurez-vous de cacher le spinner indépendamment du résultat de la récupération des statistiques
        }
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
          resizeMode="contain"
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
            jeuId="loto"
          />
          <GameSelector
            onPress={() => genererNumerosLoto("euromillions")}
            imageSource={require("../assets/euromillions.png")}
            label="Euromillions"
            jeuId="euromillions"
          />
          <GameSelector
            onPress={() => genererNumerosLoto("eurodreams")}
            imageSource={require("../assets/dreams.png")}
            label="Eurodreams"
            jeuId="eurodreams"
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
              statsNumeros={statsNumerosEuromillions}
              statsEtoiles={statsEtoilesEuromillions}
            />
          )}

        {jeuSelectionne === "eurodreams" && eurodreamsNumbers.length > 0 && (
          <EurodreamsDisplay
            eurodreamsNumbers={eurodreamsNumbers}
            eurodreamsDream={eurodreamsDream}
            statsNumeros={statsNumerosEurodreams} // Assurez-vous que ces états sont correctement définis et mis à jour
            statsDream={statsDream} // Assurez-vous que cet état est correctement défini et mis à jour
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Love4NumWidget;
