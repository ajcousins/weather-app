function iconKey(weatherCode, pod) {
  switch (true) {
    case weatherCode === 800 && pod === "n":
      return "0-mn";
    case weatherCode === 800:
      return "0-sn";
    case weatherCode === 801:
      return "1-cls";
    case weatherCode === 802:
      return "1-clw";
    case weatherCode === 803:
    case weatherCode === 804:
      return "1-cld";
    case weatherCode === 300:
    case weatherCode === 301:
    case weatherCode === 310:
      return "2-clr";
    case weatherCode === 302:
    case weatherCode >= 311 && weatherCode <= 314:
    case weatherCode === 321:
    case weatherCode >= 520 && weatherCode <= 522:
    case weatherCode === 531:
      return "2-clrr";
    case weatherCode === 500:
    case weatherCode === 501:
      return "2-clrs";
    case weatherCode >= 502 && weatherCode <= 504:
      return "2-clrrs";
    case weatherCode >= 200 && weatherCode <= 232:
      return "3-clt";
    case weatherCode === 511:
    case weatherCode >= 600 && weatherCode <= 622:
      return "4-cls";
    case weatherCode >= 701 && weatherCode <= 781:
      return "5-mst";
    default:
      return null;
  }
}
export default iconKey;
