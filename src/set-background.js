import domItems from "./dom-items";
import getBackgroundCode from "./get-background-code";

function setBackground(weather) {
  const code = getBackgroundCode(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight,
    weather.daysArray[0].probOfPrecip
  );

  domItems().backgroundMain.className = "";
  domItems().backgroundMain.classList.add(`${code}`);

  for (let i = 0; i < domItems().containers.length; i += 1) {
    if (code === "night")
      domItems().containers[i].classList.add("lightContainer");
    else domItems().containers[i].classList.remove("lightContainer");
  }
}

export default setBackground;
