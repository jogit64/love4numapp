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
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

const Love4NumWidget = () => {
  const [isReady, setIsReady] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [result, setResult] = useState("");
  const [jeuSelectionne, setJeuSelectionne] = useState<string | null>(null);

  const [lotoNumbers, setLotoNumbers] = useState([]);
  const [lotoComplementaire, setLotoComplementaire] = useState(null);

  const [euromillionsNumbers, setEuromillionsNumbers] = useState([]);
  const [euromillionsEtoiles, setEuromillionsEtoiles] = useState([]);

  const [eurodreamsNumbers, setEurodreamsNumbers] = useState([]);
  const [eurodreamsDream, setEurodreamsDream] = useState(null);

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
          source={require("./assets/etoile5.png")}
          style={styles.etoileBackground}
        />
        <Text style={styles.etoileNumero}>{numero}</Text>
      </View>
    );
  };

  useEffect(() => {
    async function prepare() {
      console.log("Préparation de l'application...");
      try {
        console.log("Empêchement de l'auto-caché de l'écran de démarrage...");
        await SplashScreen.preventAutoHideAsync();
        console.log("Chargement des polices...");
        await Font.loadAsync({
          LuckiestGuyRegular: require("./assets/fonts/LuckiestGuyRegular.ttf"),
          HennyPennyRegular: require("./assets/fonts/HennyPennyRegular.ttf"),
          // Ajoutez d'autres polices ici
        });
        console.log("Polices chargées avec succès.");
      } catch (e) {
        console.warn("Erreur lors du chargement des polices:", e);
      } finally {
        console.log(
          "Mise à jour de l'état isReady et caché de l'écran de démarrage..."
        );
        setIsReady(true);
        await SplashScreen.hideAsync();
        console.log("Écran de démarrage caché, application prête.");
      }
    }

    prepare();
  }, []);

  // const generateNumbers = async (gameType) => {
  //   setResult(`Résultat pour ${gameType}: 1, 2, 3, 4, 5`);
  // };

  const genererNumerosUniques = (debut, fin, count) => {
    let numeros = new Set();
    while (numeros.size < count) {
      numeros.add(Math.floor(Math.random() * (fin - debut + 1)) + debut);
    }
    return [...numeros];
  };

  const genererNumerosLoto = (jeu) => {
    if (!phrase) {
      alert(
        "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
      );
      return;
    }

    const seed = [...phrase].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    seedrandom(seed, { global: true }); // Réinitialise le générateur avec la graine pour reproductibilité

    switch (jeu) {
      case "loto":
        const numerosLoto = genererNumerosUniques(1, 49, 5);
        const numeroComplementaireLoto = Math.floor(Math.random() * 10) + 1; // Un seul numéro complémentaire, doublon autorisé
        setLotoNumbers(numerosLoto);
        setLotoComplementaire(numeroComplementaireLoto);
        break;
      case "euromillions":
        const numerosEuromillions = genererNumerosUniques(1, 50, 5);
        const etoilesEuromillions = genererNumerosUniques(1, 12, 2); // Correction: les étoiles sont entre 1 et 12
        setEuromillionsNumbers(numerosEuromillions);
        setEuromillionsEtoiles(etoilesEuromillions);
        break;
      case "eurodreams":
        const numerosEurodreams = genererNumerosUniques(1, 40, 6);
        const numeroDreamEurodreams = Math.floor(Math.random() * 5) + 1; // Un seul numéro complémentaire, doublon autorisé
        setEurodreamsNumbers(numerosEurodreams);
        setEurodreamsDream(numeroDreamEurodreams);
        break;
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image
          source={require("./assets/love4nul_log3.png")}
          style={styles.image}
          resizeMode="cover" // ou "contain", "stretch", "repeat", "center"
        />

        <Text style={styles.title}>
          Transformez votre amour en numéros de chance
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre phrase positive"
          placeholderTextColor="#e0b0ff"
          cursorColor={"#e0b0ff"}
          value={phrase}
          onChangeText={setPhrase}
        />
        <Text style={styles.instruction}>Choisissez le tirage :</Text>
        <View style={styles.gameSelection}>
          <GameSelector
            onPress={() => genererNumerosLoto("loto")}
            imageSource={require("./assets/loto.png")}
            label="Loto"
            jeuId="loto" // Identifiant unique pour le jeu
          />
          <GameSelector
            onPress={() => genererNumerosLoto("euromillions")}
            imageSource={require("./assets/euromillions.png")}
            label="Euromillions"
            jeuId="euromillions" // Identifiant unique pour le jeu
          />
          <GameSelector
            onPress={() => genererNumerosLoto("eurodreams")}
            imageSource={require("./assets/dreams.png")}
            label="Eurodreams"
            jeuId="eurodreams" // Identifiant unique pour le jeu
          />
        </View>

        {/* {result && <Text style={styles.result}>{result}</Text>} */}

        {/* Affichage conditionnel en fonction du jeu sélectionné */}
        {jeuSelectionne === "loto" && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{ color: "#FFEB3B", fontSize: 18, fontWeight: "bold" }}
            >
              Vos numéros pour le Loto
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
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

        {jeuSelectionne === "euromillions" && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{ color: "#FFEB3B", fontSize: 18, fontWeight: "bold" }}
            >
              Vos numéros pour l'Euromillions
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
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
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={{ color: "#FFEB3B", fontSize: 18, fontWeight: "bold" }}
            >
              Vos numéros pour l'Eurodreams
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
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
    width: width, // largeur moins les marges
    height: height * 0.4, // 30% de la hauteur de l'écran
    // Autres styles...
  },

  title: {
    fontSize: 24,
    fontFamily: "HennyPennyRegular",
    //fontFamily: "LuckiestGuyRegular",
    fontWeight: "bold",
    color: "#FFEB3B",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    width: width - 40,
    padding: 10,
    marginBottom: 20,
    color: "#e0b0ff",
    borderRadius: 25,
    backgroundColor: "#3d1961",
    textAlign: "center",
  },
  instruction: {
    color: "#FFF",
    marginBottom: 20,
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
});

export default Love4NumWidget;
