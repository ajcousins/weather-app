import weather from "./index.js";
import setBarHeights from "./set-bar-heights";
import formatDate from "./format-date";
import windDir from "./wind-dir";
import domItems from "./dom-items";

function displayForecast() {
  for (let i = 0; i < 5; i++) {
    setBarHeights();
    domItems().date[i].textContent = formatDate(weather.daysArray[i + 1].date);
    let windCode = windDir(weather.daysArray[i + 1].windDeg);
    domItems().windDir[i].src = `wind/${windCode}.svg`;
    domItems().windVal[i].textContent = Math.round(
      weather.daysArray[i + 1].windSpeed * 2.237
    );
    domItems().rainVal[i].textContent = `${Math.round(
      weather.daysArray[i + 1].probOfPrecip * 100
    )}%`;
  }
}
export default displayForecast;
