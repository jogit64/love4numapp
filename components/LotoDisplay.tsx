import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import AppStyles from "../styles/AppStyles";

import { LotoDisplayProps } from "../GameTypes";

const LotoDisplay: React.FC<LotoDisplayProps> = ({
  lotoNumbers,
  lotoComplementaire,
  statsNumeros,
  chanceNumberStats,
}) => {
  return (
    <View>
      {/* //* Affichage des numéros de loto */}
      <Text style={AppStyles.textTirage}>Vos numéros pour le Loto</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {lotoNumbers.map((num, index) => (
          <View key={index} style={AppStyles.lotoNumeros}>
            <Text style={{ color: "#ffffff" }}>{num}</Text>
          </View>
        ))}

        <View style={AppStyles.lotoComplementaire}>
          <Text style={{ color: "#ffffff" }}>{lotoComplementaire}</Text>
        </View>
      </View>

      {/* //* Affichage des statistiques */}
      <View style={AppStyles.statBloc}>
        <Text style={AppStyles.textTirage}>Vos Statistiques de Chance</Text>
        <Text style={AppStyles.statExplanation}>
          Basé sur les tirages depuis le 4 novembre 2019.
        </Text>

        <View style={AppStyles.cardContainer}>
          {lotoNumbers.map((num, index) => (
            <View key={index} style={AppStyles.card}>
              {/* Numéro */}
              <Text style={AppStyles.number}>{num}</Text>

              {/* Statistiques */}
              <View style={AppStyles.stats}>
                {/* Dernière sortie */}
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {statsNumeros[index]?.derniereSortie
                      ? `${calculateExactDrawsSinceLastOut(
                          statsNumeros[index]?.derniereSortie
                        )} tirages`
                      : "Données non disponibles"}
                  </Text>
                </View>

                {/* Pourcentage de sorties */}
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {statsNumeros[index]?.pourcentageDeSorties}%
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Statistiques du numéro chance */}
          {lotoComplementaire && chanceNumberStats && (
            <View style={AppStyles.cardChance}>
              <Text style={AppStyles.chanceNumber}>{lotoComplementaire}</Text>
              <View style={AppStyles.stats}>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {calculateExactDrawsSinceLastOut(
                      chanceNumberStats.derniereSortie
                    )}{" "}
                    tirages
                  </Text>
                </View>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {chanceNumberStats.pourcentageDeSorties}%
                  </Text>
                </View>
              </View>
            </View>
          )}
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

export default LotoDisplay;

// Vous pouvez également définir des styles spécifiques à ce composant ici
const styles = StyleSheet.create({
  // Vos styles
});
