const getCategoryColor = (category: string): string => {
  switch (category) {
    case "short":
      return "#facc15"; // yellow-400
    case "long":
      return "#34d399"; // emerald-400
    case "tour":
      return "#818cf8"; // indigo-400
    case "cruise":
      return "#38bdf8"; // sky-400
    default:
      return "#d1d5db"; // gray-300
  }
};

export { getCategoryColor };
