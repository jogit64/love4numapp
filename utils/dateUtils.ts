export const calculateExactDrawsSinceLastOut = (dateString: string): number => {
  // Vérifier que dateString est défini et non vide
  if (!dateString) {
    console.error(
      "calculateExactDrawsSinceLastOut: dateString is undefined or empty."
    );
    return 0; // Retourner 0 ou gérer l'erreur comme vous le jugez approprié
  }

  // Convertir la date du format "jj/mm/aa" au format "aaaa-mm-jj"
  const parts = dateString.split("/");
  const convertedDateString = `20${parts[2]}-${parts[1]}-${parts[0]}`; // Présumer que "aa" est 2000+
  const lastOutDate = new Date(convertedDateString);
  const today = new Date();
  let draws = 0;

  // Jours de tirage : lundi = 1, mercredi = 3, samedi = 6
  const drawDays = [1, 3, 6];

  for (
    let date = new Date(lastOutDate);
    date <= today;
    date.setDate(date.getDate() + 1)
  ) {
    if (drawDays.includes(date.getDay())) {
      draws++;
    }
  }

  return draws;
};
