import React from "react";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import AppStyles from "../styles/AppStyles";
import { Stat } from "../GameTypes";

import { EuromillionsDisplayProps } from "../GameTypes";
import { EtoileEuromillionsProps } from "../GameTypes";

const EuromillionsDisplay: React.FC<EuromillionsDisplayProps> = ({
  euromillionsNumbers,
  euromillionsEtoiles,
  statsNumeros,
  statsEtoiles,
}) => {
  // Composant pour afficher les étoiles avec l'image de fond
  const EtoileEuromillions: React.FC<EtoileEuromillionsProps> = ({
    numero,
  }) => (
    <View style={AppStyles.etoileContainer}>
      <Image
        source={require("../assets/etoile5.png")} // Assurez-vous que le chemin vers votre image est correct
        style={AppStyles.etoileBackground}
      />
      <Text style={AppStyles.etoileNumero}>{numero}</Text>
    </View>
  );

  return (
    <View>
      {/* Affichage des numéros d'Euromillions */}
      <Text style={AppStyles.textTirage}>Vos numéros pour l'Euromillions</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {euromillionsNumbers.map((num, index) => (
          <View key={index} style={AppStyles.lotoNumeros}>
            <Text style={{ color: "#ffffff" }}>{num}</Text>
          </View>
        ))}
        {euromillionsEtoiles.map((etoile, index) => (
          <EtoileEuromillions key={index} numero={etoile} />
        ))}
      </View>

      {/* Affichage des statistiques */}
      <View style={AppStyles.statBloc}>
        <Text style={AppStyles.textTirage}>Vos Statistiques de Chance</Text>
        <Text style={AppStyles.statExplanation}>
          Basé sur les tirages depuis le 4 novembre 2019.
        </Text>

        <View style={AppStyles.cardContainer}>
          {statsNumeros.map((stat, index) => (
            <View key={`num-${index}`} style={AppStyles.card}>
              <Text style={AppStyles.number}>{euromillionsNumbers[index]}</Text>
              <View style={AppStyles.stats}>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {stat?.derniereSortie
                      ? `${calculateExactDrawsSinceLastOut(
                          stat?.derniereSortie
                        )} tirages`
                      : "N/A"}
                  </Text>
                </View>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {stat?.pourcentageDeSorties ?? "N/A"}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
          {statsEtoiles.map((stat, index) => (
            <View key={`etoile-${index}`} style={AppStyles.cardChance}>
              <Text style={AppStyles.chanceNumber}>
                {euromillionsEtoiles[index]}
              </Text>
              <View style={AppStyles.stats}>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {stat?.derniereSortie
                      ? `${calculateExactDrawsSinceLastOut(
                          stat?.derniereSortie
                        )} tirages`
                      : "N/A"}
                  </Text>
                </View>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {stat?.pourcentageDeSorties ?? "N/A"}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        {/* //* Icônes et légende du bas*/}
        <View style={AppStyles.legend}>
          <View style={AppStyles.legendItem}>
            <MaterialIcons name="history" size={20} color="#ffffff" />
            <Text style={AppStyles.legendText}>Dernière sortie</Text>
          </View>
          <View style={AppStyles.legendItem}>
            <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
            <Text style={AppStyles.legendText}>% de sorties</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EuromillionsDisplay;
