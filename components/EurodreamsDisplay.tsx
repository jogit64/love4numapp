import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { calculateExactDrawsSinceLastOut } from "../utils/dateUtils";
import AppStyles from "../styles/AppStyles";

import { EurodreamsDisplayProps } from "../GameTypes";

const EurodreamsDisplay: React.FC<EurodreamsDisplayProps> = ({
  eurodreamsNumbers,
  eurodreamsDream,
  statsNumeros,
  statsDream,
}) => {
  return (
    <View>
      {/* Affichage des numéros Eurodreams */}
      <Text style={AppStyles.textTirage}>Vos numéros pour Eurodreams</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {eurodreamsNumbers.map((num, index) => (
          <View key={index} style={AppStyles.lotoNumeros}>
            <Text style={{ color: "#ffffff" }}>{num}</Text>
          </View>
        ))}
        {/* Affichage du numéro de rêve avec un style spécifique */}
        <View style={AppStyles.lotoComplementaire}>
          <Text style={{ color: "#ffffff" }}>{eurodreamsDream}</Text>
        </View>
      </View>

      {/* Affichage des statistiques des numéros et du numéro de rêve */}
      <View style={AppStyles.statBloc}>
        <Text style={AppStyles.textTirage}>
          Vos Statistiques de Chance pour Eurodreams
        </Text>
        <Text style={AppStyles.statExplanation}>
          Basé sur les tirages depuis le 4 novembre 2019.
        </Text>

        <View style={AppStyles.cardContainer}>
          {/* Statistiques pour chaque numéro d'Eurodreams */}
          {statsNumeros.map((stat, index) => (
            <View key={`num-${index}`} style={AppStyles.card}>
              <Text style={AppStyles.number}>{eurodreamsNumbers[index]}</Text>
              <View style={AppStyles.stats}>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {stat?.derniereSortie
                      ? `${calculateExactDrawsSinceLastOut(
                          stat.derniereSortie
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

          {/* Statistiques pour le numéro de rêve */}
          {statsDream && (
            <View key="dream" style={AppStyles.cardChance}>
              <Text style={AppStyles.chanceNumber}>{eurodreamsDream}</Text>
              <View style={AppStyles.stats}>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="history" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {statsDream.derniereSortie
                      ? `${calculateExactDrawsSinceLastOut(
                          statsDream.derniereSortie
                        )} tirages`
                      : "N/A"}
                  </Text>
                </View>
                <View style={AppStyles.statItem}>
                  <MaterialIcons name="pie-chart" size={20} color="#ffffff" />
                  <Text style={AppStyles.statText}>
                    {statsDream.pourcentageDeSorties ?? "N/A"}%
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

export default EurodreamsDisplay;
