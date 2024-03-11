// GameTypes.ts

export interface Stat {
  derniereSortie: string;
  nombreDeSorties: number;
  numero: number;
  pourcentageDeSorties: string;
  type: string;
}

export interface LotoDisplayProps {
  lotoNumbers: number[];
  lotoComplementaire: number;
  statsNumeros: Stat[];
  chanceNumberStats: Stat;
}

export interface EuromillionsDisplayProps {
  euromillionsNumbers: number[];
  euromillionsEtoiles: number[];
  statsNumeros: Stat[];
  statsEtoiles: Stat[];
}

export interface EtoileEuromillionsProps {
  numero: number;
}

export interface EurodreamsDisplayProps {
  eurodreamsNumbers: number[];
  eurodreamsDream: number | null;
  statsNumeros: Stat[];
  statsDream: Stat | null;
}

export interface GameSelectorProps {
  onPress: () => void; // Supposant que onPress est une fonction qui ne prend aucun argument et ne retourne rien
  imageSource: any; // Remplacez `any` par le type approprié, par exemple React Native's ImageSourcePropType si c'est une source d'image
  label: string;
  jeuId: string;
}
