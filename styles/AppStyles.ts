import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const AppStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    //backgroundColor: "#fb21ff", // Un fond violet vif pour l'énergie
    backgroundColor: "#0F052C", // Un fond violet vif pour l'énergie
    //marginBottom: 80,
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
    //margin: 5,
    flexBasis: "30%",
    margin: "1%",
    alignItems: "center",
  },
  cardChance: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    //margin: 5,
    flexBasis: "30%",
    margin: "1%",
    alignItems: "center",
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
  },
  chanceNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stats: {
    marginTop: 5,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    //marginVertical: 5,
  },
  statText: {
    fontSize: 14,
    fontFamily: "robotoregular",
    marginLeft: 5,
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

export default AppStyles;
