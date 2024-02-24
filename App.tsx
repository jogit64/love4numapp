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
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import seedrandom from "seedrandom";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

const GameSelector = ({ onPress, imageSource, label }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
    <Image source={imageSource} style={styles.gameImage} />
    <Text style={styles.gameLabel}>{label}</Text>
  </TouchableOpacity>
);

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

  // const generateNumbers = async (gameType) => {
  //   setResult(`Résultat pour ${gameType}: 1, 2, 3, 4, 5`);
  // };

  // const genererNumerosLoto = (jeu) => {
  //   if (!phrase) {
  //     alert(
  //       "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
  //     );
  //     return;
  //   }

  //   const seed = [...phrase].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  //   seedrandom(seed, { global: true }); // Initialise le générateur de nombres aléatoires

  //   let numeros;
  //   let message;
  //   switch (jeu) {
  //     case "loto":
  //       numeros = Array.from(
  //         { length: 5 },
  //         () => Math.floor(Math.random() * 49) + 1
  //       );
  //       const numeroComplementaire = Math.floor(Math.random() * 10) + 1;
  //       message = `Vos numéros pour le Loto: ${numeros.join(
  //         ", "
  //       )} et le numéro complémentaire: ${numeroComplementaire}`;
  //       break;
  //     case "euromillions":
  //       numeros = Array.from(
  //         { length: 5 },
  //         () => Math.floor(Math.random() * 50) + 1
  //       );
  //       const etoiles = Array.from(
  //         { length: 2 },
  //         () => Math.floor(Math.random() * 12) + 1
  //       );
  //       message = `Vos numéros pour l'Euromillions: ${numeros.join(
  //         ", "
  //       )} et les étoiles: ${etoiles.join(", ")}`;
  //       break;
  //     case "eurodreams":
  //       numeros = Array.from(
  //         { length: 6 },
  //         () => Math.floor(Math.random() * 40) + 1
  //       );
  //       const numeroDream = Math.floor(Math.random() * 5) + 1;
  //       message = `Vos numéros pour l'Eurodreams: ${numeros.join(
  //         ", "
  //       )} et le numéro Dream: ${numeroDream}`;
  //       break;
  //   }
  //   //  setResult(message); // Met à jour l'état `result` avec le message généré
  //   // setResult({
  //   //   numeros: [1, 2, 3, 4, 5],
  //   //   typeNumeros: "lotoNumeros",
  //   //   etoiles: [11, 12],
  //   // });

  //   setResult({
  //     jeu,
  //     numeros: numeros, // les numéros principaux
  //     numeroComplementaire: jeu === "loto" ? numeroComplementaire : undefined, // spécifique au Loto
  //     etoiles: jeu === "euromillions" ? etoiles : undefined, // spécifique à l'Euromillions
  //     numeroDream: jeu === "eurodreams" ? numeroDream : undefined, // spécifique à l'Eurodreams
  //   });
  // };

  const genererNumerosLoto = (jeu) => {
    if (!phrase) {
      alert(
        "Veuillez entrer une phrase ou des mots d'amour avant de générer des numéros."
      );
      return;
    }

    // Initialisez les variables au début de la fonction
    let numeros = [];
    let numeroComplementaire; // Pas besoin d'initialiser car sera défini conditionnellement
    let etoiles; // Idem
    let numeroDream; // Idem

    const seed = [...phrase].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    seedrandom(seed, { global: true });

    switch (jeu) {
      case "loto":
        numeros = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 49) + 1
        );
        numeroComplementaire = Math.floor(Math.random() * 10) + 1;
        break;
      case "euromillions":
        numeros = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 50) + 1
        );
        etoiles = Array.from(
          { length: 2 },
          () => Math.floor(Math.random() * 12) + 1
        );
        break;
      case "eurodreams":
        numeros = Array.from(
          { length: 6 },
          () => Math.floor(Math.random() * 40) + 1
        );
        numeroDream = Math.floor(Math.random() * 5) + 1;
        break;
    }

    // Maintenant, vous pouvez utiliser les variables car elles sont accessibles
    setResult({
      jeu,
      numeros, // les numéros principaux
      numeroComplementaire: jeu === "loto" ? numeroComplementaire : undefined,
      etoiles: jeu === "euromillions" ? etoiles : undefined,
      numeroDream: jeu === "eurodreams" ? numeroDream : undefined,
    });
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
        <Text style={styles.instruction}>
          Entrez une phrase ou des mots d'amour pour voir comment l'univers
          transforme votre message en numéros de chance.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre phrase positive"
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

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            margin: 10,
          }}
        >
          {result.numeros &&
            result.numeros.map((numero, index) => (
              <Text
                key={index}
                style={[styles.numeros, styles[result.typeNumeros]]}
              >
                {numero}
              </Text>
            ))}
          {result.etoiles &&
            result.etoiles.map((etoile, index) => (
              <ImageBackground
                key={index}
                source={require("./assets/etoile5.png")}
                style={[styles.numeros, styles.euromillionsEtoiles]}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {etoile}
                </Text>
              </ImageBackground>
            ))}
        </View>
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
    paddingTop: 25,
  },

  image: {
    width: width, // largeur moins les marges
    height: height * 0.38, // 30% de la hauteur de l'écran
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
    //borderRadius: 25,
    //backgroundColor: "#FFF", // Fond blanc pour faire ressortir l'input
    backgroundColor: "#571373", // Fond blanc pour faire ressortir l'input
    borderColor: "#BDBDBD",
    color: "#fff",
    //borderWidth: 1,
    borderBottomWidth: 1,
    textAlign: "left",
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
    borderWidth: 1,
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
  // gameLabel: {
  //   color: "#FFF",
  //   fontSize: 16,
  // },

  result: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFEB3B", // Utilisation du jaune néon pour les résultats
    fontWeight: "bold",
    padding: 10,
  },

  gameImage: {
    width: 100, // Ajustez selon la taille désirée
    height: 100, // Ajustez selon la taille désirée
    resizeMode: "contain", // 'cover' pour remplir, 'contain' pour s'adapter sans tronquer
  },

  numeros: {
    color: "#ffffff",
    borderRadius: 20, // Pour un cercle parfait, assurez-vous que width et height sont égaux
    padding: 10,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
    height: 40,
    lineHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // Styles spécifiques pour Loto
  lotoNumeros: {
    backgroundColor: "#00a2d9",
  },
  lotoComplementaire: {
    backgroundColor: "#ea3946",
  },
  // Styles spécifiques pour Euromillions
  euromillionsNumeros: {
    backgroundColor: "#001367",
  },
  euromillionsEtoiles: {
    // Pour les étoiles, vous pouvez utiliser un composant Image ou une vue avec une image de fond
    width: 40,
    height: 40,
    backgroundImage: "url(./assets/etoile5.png)", // Exemple, à ajuster selon React Native
  },
  // Styles spécifiques pour Eurodreams
  eurodreamsNumeros: {
    backgroundColor: "#781ea6",
  },
  eurodreamsDream: {
    backgroundColor: "#ff3c69",
  },

  gameLabel: {
    marginTop: 8, // Ajustez l'espacement selon vos besoins
    color: "#FFF", // Choisissez une couleur qui correspond à votre thème
    fontSize: 16, // Ajustez la taille de police selon vos besoins
    textAlign: "center", // Assurez-vous que le texte est centré sous l'image
  },
});

export default Love4NumWidget;
