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

  // const GameSelector = ({ onPress, imageSource, label }) => (
  //   <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
  //     <Image source={imageSource} style={styles.gameImage} />
  //     <Text style={styles.gameLabel}>{label}</Text>
  //   </TouchableOpacity>
  // );

  const GameSelector = ({ onPress, imageSource, label, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.gameSelector, style]}>
      <Image source={imageSource} style={styles.gameImage} />
      <Text style={styles.gameLabel}>{label}</Text>
    </TouchableOpacity>
  );

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

  const genererNumerosLoto = (jeu) => {
    if (!phrase) {
      alert(
        "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
      );
      return;
    }

    const seed = [...phrase].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    seedrandom(seed, { global: true }); // Initialise le générateur de nombres aléatoires

    let numeros;
    let message;
    switch (jeu) {
      case "loto":
        numeros = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 49) + 1
        );
        const numeroComplementaire = Math.floor(Math.random() * 10) + 1;
        message = `Vos numéros pour le Loto: ${numeros.join(
          ", "
        )} et le numéro complémentaire: ${numeroComplementaire}`;
        break;
      case "euromillions":
        numeros = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 50) + 1
        );
        const etoiles = Array.from(
          { length: 2 },
          () => Math.floor(Math.random() * 12) + 1
        );
        message = `Vos numéros pour l'Euromillions: ${numeros.join(
          ", "
        )} et les étoiles: ${etoiles.join(", ")}`;
        break;
      case "eurodreams":
        numeros = Array.from(
          { length: 6 },
          () => Math.floor(Math.random() * 40) + 1
        );
        const numeroDream = Math.floor(Math.random() * 5) + 1;
        message = `Vos numéros pour l'Eurodreams: ${numeros.join(
          ", "
        )} et le numéro Dream: ${numeroDream}`;
        break;
    }
    setResult(message); // Met à jour l'état `result` avec le message généré
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
          />
          <GameSelector
            onPress={() => genererNumerosLoto("euromillions")}
            imageSource={require("./assets/euromillions.png")}
            label="Euromillions"
          />
          <GameSelector
            onPress={() => genererNumerosLoto("eurodreams")}
            imageSource={require("./assets/dreams.png")}
            label="Eurodreams"
          />
        </View>

        {result && <Text style={styles.result}>{result}</Text>}
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
    color: "#FFEB3B", // Jaune néon pour le contraste
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
    backgroundColor: "#3d1961", // Fond blanc pour faire ressortir l'input
    //borderColor: "#781ea6",

    // borderWidth: 1,
    //borderBottomWidth: 1,
    textAlign: "center",
  },
  instruction: {
    color: "#FFF",
    marginBottom: 20,
  },
  gameSelection: {
    flexDirection: "row",
    //justifyContent: "space-around",
    justifyContent: "space-evenly",
    width: "100%",
    //marginBottom: 20,
    //backgroundColor: "#00E676",
    height: 80,
  },
  // gameOption: {
  //   backgroundColor: "#00E676", // Vert néon pour les boutons
  //   padding: 10,
  //   borderRadius: 20,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.23,
  //   shadowRadius: 2.62,
  //   elevation: 4,
  // },

  gameSelector: {
    alignItems: "center",
    //justifyContent: "space-around",
    justifyContent: "center",
    backgroundColor: "#00E676",

    //backgroundColor: "#000",
    //padding: 10,

    paddingHorizontal: 6,
    borderRadius: 15,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4,
    //height: 120, // Exemple de hauteur explicite, ajustez selon vos besoins
  },

  gameImage: {
    width: 100,
    height: 55,
    resizeMode: "contain",
    // borderWidth: 2,
    // borderColor: "#fff",
    //marginBottom: -25,
  },

  gameLabel: {
    color: "#0F052C",
    fontSize: 12,
    //marginTop: -10,
  },

  result: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFEB3B", // Utilisation du jaune néon pour les résultats
    fontWeight: "bold",
    padding: 10,
  },
});

export default Love4NumWidget;
