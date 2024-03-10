// GameTypes.ts
export interface Stat {
  id: number;
  value: number;
}

export interface LotoDisplayProps {
  lotoNumbers: number[];
  lotoComplementaire: number | null;
  statsNumeros: Stat[];
  chanceNumberStats: Stat | null;
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
