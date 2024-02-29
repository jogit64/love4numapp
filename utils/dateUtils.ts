export const calculateDaysBetweenDates = (dateString: string): number => {
  // Convertir la date de sortie du format "jj/mm/aa" au format "mm/jj/aaaa"
  const parts = dateString.split("/");
  const convertedDate = new Date(
    parseInt(parts[2], 10) + 2000,
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );

  const today = new Date();
  const differenceInTime = today.getTime() - convertedDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};
