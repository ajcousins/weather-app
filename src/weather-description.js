function weatherdescription(dayObj) {
  let textArr = [];
  let textParagraph;

  textArr.push(
    `${dayObj.description.charAt(0).toUpperCase()}${dayObj.description.slice(
      1
    )} and ${windDescriptive(dayObj.windSpeed)}.`
  );

  textArr.push(`Chance of rain: ${Math.round(dayObj.probOfPrecip * 100)}%`);
  textArr.push(`Humidity: ${Math.round(dayObj.humidity)}%`);

  textParagraph = textArr[0] + "\r\n" + textArr[1] + "\r\n" + textArr[2];

  return textParagraph;
}
export default weatherdescription;

function windDescriptive(speed) {
  let speedMph = Math.round(speed * 2.237);

  switch (true) {
    case speedMph < 8:
      return "light winds";
    case speedMph > 7 && speedMph < 13:
      return "a gentle breeze";
    case speedMph > 12 && speedMph < 19:
      return "a moderate breeze";
    case speedMph > 18 && speedMph < 24:
      return "a fresh breeze";
    case speedMph > 23:
      return "strong winds";
    default:
      return "";
  }
}
