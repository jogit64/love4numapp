// LoveNumbersScreen.tsx
import React, { useState, FC } from "react";
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

//import { collection, getDocs } from "firebase/firestore";

import { doc, getDoc } from "firebase/firestore";

//import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LotoDisplay from "../components/LotoDisplay";
import EuromillionsDisplay from "../components/EuromillionsDisplay";
import EurodreamsDisplay from "../components/EurodreamsDisplay";
import CustomLoader from "../components/CustomLoader";

import { Stat } from "../GameTypes";
import { GameSelectorProps } from "../GameTypes";

const { width, height } = Dimensions.get("window");

const Love4NumWidget: FC = () => {
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

  const [lotoNumbers, setLotoNumbers] = useState<number[]>([]);
  const [lotoComplementaire, setLotoComplementaire] = useState<number | null>(
    null
  );
  const [statsNumeros, setStatsNumeros] = useState<Stat[]>([]);
  const [chanceNumberStats, setChanceNumberStats] = useState<Stat | null>(null);

  const [euromillionsNumbers, setEuromillionsNumbers] = useState<number[]>([]);
  const [euromillionsEtoiles, setEuromillionsEtoiles] = useState<number[]>([]);
  const [statsNumerosEuromillions, setStatsNumerosEuromillions] = useState<
    Stat[]
  >([]);
  const [statsEtoilesEuromillions, setStatsEtoilesEuromillions] = useState<
    Stat[]
  >([]);

  const [eurodreamsNumbers, setEurodreamsNumbers] = useState<number[]>([]);
  const [eurodreamsDream, setEurodreamsDream] = useState<number | null>(null);
  const [statsNumerosEurodreams, setStatsNumerosEurodreams] = useState<Stat[]>(
    []
  );
  const [statsDream, setStatsDream] = useState<Stat | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const GameSelector: React.FC<GameSelectorProps> = ({
    onPress,
    imageSource,
    label,
    jeuId,
  }) => (
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

  const genererNumerosUniques = (
    debut: number,
    fin: number,
    count: number
  ): number[] => {
    let numeros = new Set<number>();
    while (numeros.size < count) {
      numeros.add(Math.floor(Math.random() * (fin - debut + 1)) + debut);
    }
    return [...numeros];
  };

  const NOMBRE_D_OR = 1.618033988749895;

  const genererNumerosLoto = async (
    jeu: "loto" | "euromillions" | "eurodreams"
  ) => {
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

    const fetchStatsForNumber = async (
      numero: number,
      type: string,
      collectionName: string
    ): Promise<Stat | null> => {
      try {
        const docRef = doc(db, collectionName, `${numero}_${type}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Stat; // Cast en tant que FirestoreStat
          return data; // Retourne directement les données, qui correspondent maintenant à l'interface
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
        try {
          //seedrandom(seedAjustee, { global: true });
          // Convertit seedAjustee en chaîne de caractères
          seedrandom(seedAjustee.toString(), { global: true });

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
          const resolvedStatsChanceLoto = await statsChancePromiseLoto;

          // Filtrer les valeurs null des statistiques résolues
          const filteredStatsLoto = resolvedStatsLoto.filter(
            (stat) => stat !== null
          ) as Stat[];
          const filteredStatsChanceLoto = resolvedStatsChanceLoto
            ? [resolvedStatsChanceLoto]
            : [];

          // Mettre à jour tous les états avec les données filtrées
          setLotoNumbers(numerosLoto);
          setLotoComplementaire(numeroComplementaireLoto);
          setStatsNumeros(filteredStatsLoto); // Utiliser les données filtrées
          setChanceNumberStats(
            filteredStatsChanceLoto.length > 0
              ? filteredStatsChanceLoto[0]
              : null
          ); // Ajustement pour un seul résultat ou null
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la récupération des statistiques :",
            error
          );
        } finally {
          setIsLoading(false);
        }
        break;

      case "euromillions":
        try {
          //seedrandom(seedAjustee, { global: true });
          // Convertit seedAjustee en chaîne de caractères
          seedrandom(seedAjustee.toString(), { global: true });

          const numerosEuromillions = genererNumerosUniques(1, 50, 5);
          const etoilesEuromillions = genererNumerosUniques(1, 12, 2);

          // Récupération des statistiques pour les numéros et étoiles d'Euromillions
          const statsNumerosPromises = numerosEuromillions.map((numero) =>
            fetchStatsForNumber(numero, "principal", "euromillionsStats")
          );
          const statsEtoilesPromises = etoilesEuromillions.map((etoile) =>
            fetchStatsForNumber(etoile, "chance", "euromillionsStats")
          );

          // Attendre que toutes les promesses se résolvent
          const resolvedStatsNumeros = await Promise.all(statsNumerosPromises);
          const resolvedStatsEtoiles = await Promise.all(statsEtoilesPromises);

          // Filtrer les valeurs null des statistiques résolues pour les numéros et étoiles
          const filteredStatsNumeros = resolvedStatsNumeros.filter(
            (stat) => stat !== null
          ) as Stat[];
          const filteredStatsEtoiles = resolvedStatsEtoiles.filter(
            (stat) => stat !== null
          ) as Stat[];

          // Mettre à jour tous les états avec les données filtrées
          setEuromillionsNumbers(numerosEuromillions);
          setEuromillionsEtoiles(etoilesEuromillions);
          setStatsNumerosEuromillions(filteredStatsNumeros); // Utiliser les données filtrées pour les numéros
          setStatsEtoilesEuromillions(filteredStatsEtoiles); // Utiliser les données filtrées pour les étoiles
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la récupération des statistiques pour Euromillions:",
            error
          );
        } finally {
          setIsLoading(false);
        }
        break;

      case "eurodreams":
        try {
          //seedrandom(seedAjustee, { global: true });
          // Convertit seedAjustee en chaîne de caractères
          seedrandom(seedAjustee.toString(), { global: true });

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

          // Filtrer les valeurs null des statistiques résolues
          const filteredStatsNumerosEurodreams =
            resolvedStatsNumerosEurodreams.filter(
              (stat) => stat !== null
            ) as Stat[];
          const filteredStatsDream = resolvedStatsDream
            ? [resolvedStatsDream]
            : [];

          setEurodreamsNumbers(numerosEurodreams);
          setEurodreamsDream(numeroDreamEurodreams);
          setStatsNumerosEurodreams(filteredStatsNumerosEurodreams); // Utiliser les données filtrées
          setStatsDream(
            filteredStatsDream.length > 0 ? filteredStatsDream[0] : null
          ); // Ajustement pour un seul résultat ou null
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la récupération des statistiques :",
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
            // imageSource={require("../assets/loto.png")}
            // label="Loto"
            imageSource={require("../assets/iconlov4.png")}
            label="Classique"
            jeuId="loto"
          />
          <GameSelector
            onPress={() => genererNumerosLoto("euromillions")}
            // imageSource={require("../assets/euromillions.png")}
            // label="Euromillions"
            imageSource={require("../assets/iconlov4_5.png")}
            label="Européen"
            jeuId="euromillions"
          />
          <GameSelector
            onPress={() => genererNumerosLoto("eurodreams")}
            // imageSource={require("../assets/dreams.png")}
            // label="Eurodreams"
            imageSource={require("../assets/iconlov4_3.png")}
            label="Rêves"
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
