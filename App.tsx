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
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

const Love4NumWidget = () => {
  const [isReady, setIsReady] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [result, setResult] = useState("");

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

  const generateNumbers = async (gameType) => {
    setResult(`Résultat pour ${gameType}: 1, 2, 3, 4, 5`);
  };

  if (!isReady) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image
          source={require("./assets/logo_love4num_1.png")}
          style={styles.image}
          resizeMode="cover" // ou "contain", "stretch", "repeat", "center"
        />

        <Text style={styles.title}>
          Transformez votre amour en numéros de chance
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre phrase positive"
          value={phrase}
          onChangeText={setPhrase}
        />
        <Text style={styles.instruction}>Choisissez le tirage :</Text>
        <View style={styles.gameSelection}>
          {["Loto", "Euromillions", "Eurodreams"].map((game) => (
            <TouchableOpacity
              key={game}
              style={styles.gameOption}
              onPress={() => generateNumbers(game)}
            >
              <Text style={styles.gameLabel}>{game}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: "#22072d", // Un fond violet vif pour l'énergie
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: height,
    //padding: 20,
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
    borderRadius: 25,
    backgroundColor: "#FFF", // Fond blanc pour faire ressortir l'input
    borderColor: "#BDBDBD",
    borderWidth: 1,
    textAlign: "center",
  },
  instruction: {
    color: "#FFF",
    marginBottom: 20,
  },
  gameSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  gameOption: {
    backgroundColor: "#00E676", // Vert néon pour les boutons
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  gameLabel: {
    color: "#FFF",
    fontSize: 16,
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
