export function returnColorType(color) {
  const isArray = Array.isArray(color) && color;
  const isGradient = color.length > 5;
  const positionArray = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];
  const colorStopMap =
    isArray &&
    isArray.map((m, i) => {
      return `radial-gradient(circle at ${positionArray[i]},${m} 0%,transparent 80%)`;
    });

  return {
    isGradient: isGradient,
    color: isGradient ? color : `${colorStopMap}`,
  };
}
