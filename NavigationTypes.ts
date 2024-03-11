// NavigationTypes.ts

import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Accueil: undefined;
  Jouer: undefined;
  Crédits: undefined;
  LegalMentions: undefined;
  PrivacyPolicy: undefined;
};

export type AccueilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Accueil"
>;

export type JouerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Jouer"
>;

export type CreditsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Crédits"
>;

export type LegalMentionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LegalMentions"
>;

export type PrivacyPolicyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PrivacyPolicy"
>;
