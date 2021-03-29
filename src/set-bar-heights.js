import weather from "./index.js";
import domItems from "./dom-items";
import colourHex from "./colourHex";
import getBarHeights from "./get-bar-heights";
import iconKey from "./icon-key";

function setBarHeights() {
  let heights = getBarHeights(weather);

  for (let i = 0; i < 5; i++) {
    domItems().symbolCard[i].src = "symbols/00-dot.svg";
    domItems().bars[i].setAttribute("style", `height: 80px`);
    domItems().colourZone[i].setAttribute(
      "style",
      `background-color: rgba(255, 255, 255, 0.3)`
    );
  }
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      let delay = 100;
      setTimeout(() => {
        let currentSymbol = iconKey(
          weather.daysArray[i + 1].weatherCode,
          weather.daysArray[i + 1].dayNight
        );
        domItems().symbolCard[i].src = `symbols/${currentSymbol}.svg`;
        domItems().bars[i].setAttribute("style", `height: ${heights[i]}px`);
        domItems().tempZone[i].textContent = `${Math.round(
          weather.daysArray[i + 1].temperature
        )}º`;
        let tempHex = colourHex(
          Math.round(weather.daysArray[i + 1].temperature)
        );
        domItems().colourZone[i].setAttribute(
          "style",
          `background-color: #${tempHex}`
        );
      }, delay * (i + 1));
    }
  }, 500);
}
export default setBarHeights;
