import weather from "./index.js";
import domItems from "./dom-items";
import getBackgroundCode from "./get-background-code";

function setBackground() {
  let code = getBackgroundCode(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight,
    weather.daysArray[0].probOfPrecip
  );

  domItems().backgroundMain.className = "";
  domItems().backgroundMain.classList.add(`${code}`);

  for (let i = 0; i < domItems().containers.length; i++) {
    if (code === "night")
      domItems().containers[i].classList.add("lightContainer");
    else domItems().containers[i].classList.remove("lightContainer");
  }
}

export default setBackground;
