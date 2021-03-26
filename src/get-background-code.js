function getBackgroundCode(weatherCode, pod) {
  switch (true) {
    case pod === "n":
      return "00_night";
    case weatherCode >= 800 && weatherCode <= 801:
      return "01_sun";
    case weatherCode >= 200 && weatherCode <= 232:
    case weatherCode === 804:
      return "02_thick-cloud";
    case weatherCode >= 300 && weatherCode <= 321:
    case weatherCode >= 502 && weatherCode <= 531:
      return "03_rain";
    case weatherCode === 500:
    case weatherCode === 501:
    case weatherCode === 802:
    case weatherCode === 803:
      return "04_half-cloud";
    case weatherCode >= 600 && weatherCode <= 622:
    case weatherCode >= 701 && weatherCode <= 781:
      return "05_white";

    default:
      return "01_sun";
  }
}
export default getBackgroundCode;
