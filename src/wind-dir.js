function windDir(deg) {
  // Returns file name.

  switch (true) {
    case deg < 15:
    case deg >= 345:
      return "06_S";
    case deg >= 15 && deg < 45:
      return "07_SSW";
    case deg >= 45 && deg < 75:
      return "08_SWW";
    case deg >= 75 && deg < 105:
      return "09_W";
    case deg >= 105 && deg < 135:
      return "10_NWW";
    case deg >= 135 && deg < 165:
      return "11_NNW";
    case deg >= 165 && deg < 195:
      return "00_N";
    case deg >= 195 && deg < 225:
      return "01_NNE";
    case deg >= 225 && deg < 255:
      return "02_NEE";
    case deg >= 255 && deg < 285:
      return "03_E";
    case deg >= 285 && deg < 315:
      return "04_SEE";
    case deg >= 315 && deg < 345:
      return "05_SSE";
  }
}
export default windDir;
