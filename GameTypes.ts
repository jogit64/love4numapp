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

export interface EurodreamsDisplayProps {
  eurodreamsNumbers: number[];
  eurodreamsDream: number | null;
  statsNumeros: Stat[];
  statsDream: Stat | null;
}
