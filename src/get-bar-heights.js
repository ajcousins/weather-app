function getBarHeights(weather) {
  // Bar height: Minimum: 80px; Maximum: 205px;
  let temperatures = [];
  let heights = [];
  for (let i = 1; i < weather.daysArray.length; i++) {
    temperatures.push(weather.daysArray[i].temperature);
  }
  let minTemp = Math.min(...temperatures);
  let maxTemp = Math.max(...temperatures);
  let degree = 125 / (maxTemp - minTemp);

  // If temperature spread is too wide, apply a maximum pixel height per degree.
  if (degree > 40) degree = 40;

  // what is the difference in pixels between midtemp and middle pixel/ 143px
  let maxPx = maxTemp * degree - minTemp * degree + 80;
  let midPx = (maxPx - 80) / 2 + 80;
  let midDifference = 143 - midPx;

  for (let i = 1; i < weather.daysArray.length; i++) {
    let height = 80; // Minimum height
    height +=
      Math.round(weather.daysArray[i].temperature * degree - minTemp * degree) +
      midDifference;
    heights.push(height);
  }
  return heights;
}
export default getBarHeights;
