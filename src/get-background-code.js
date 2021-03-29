function getBackgroundCode(weatherCode, pod, probOfPrecip) {
  switch (true) {
    case pod === "n":
      return "night";
    case weatherCode >= 800 && weatherCode <= 801:
      return "day";
    case weatherCode >= 200 && weatherCode <= 232:
    case weatherCode === 804:
      return "thickCloud";
    case weatherCode >= 300 && weatherCode <= 321:
    case weatherCode >= 502 && weatherCode <= 531:
    case probOfPrecip > 0.8 && pod === "d":
      return "rain";
    case weatherCode === 500:
    case weatherCode === 501:
    case weatherCode === 802:
    case weatherCode === 803:
      return "halfCloud";
    case weatherCode >= 600 && weatherCode <= 622:
    case weatherCode >= 701 && weatherCode <= 781:
      return "white";
    default:
      return "day";
  }
}
export default getBackgroundCode;
