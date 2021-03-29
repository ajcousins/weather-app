import weatherDescription from "./weather-description";
import colourHex from "./colourHex";
import iconKey from "./icon-key";
import domItems from "./dom-items";

function displayCurrentWeather(weather) {
  const currentTemperature = weather.daysArray[0].temperature;
  domItems().temperatureMain.textContent = `${Math.round(currentTemperature)}º`;

  const currentSymbol = iconKey(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight
  );
  domItems().symbolMain.src = `symbols/${currentSymbol}.svg`;

  const descriptiveText = weatherDescription(weather.daysArray[0]);
  domItems().nowDescription.textContent = descriptiveText;

  const tempHex = colourHex(Math.round(weather.daysArray[0].temperature));
  domItems().nowTempBar.setAttribute("style", `background-color: #${tempHex}`);

  domItems().nowTitle.textContent = `Current weather for ${weather.daysArray[0].location}...`;
}
export default displayCurrentWeather;
