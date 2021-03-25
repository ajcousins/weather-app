import apiKey from "./api-key";
import iconKey from "./icon-key";
import domItems from "./dom-items";

const location = "london";

fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey()}&units=metric`,
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    weather.handleData(response);
  })
  .catch(function (error) {
    console.log("Error");
    console.error(error);
  });

const weather = {
  daysArray: [],
  handleData(obj) {
    for (let i = 0; i < obj.list.length; i++) {
      // Get data for right now + next 5 days.
      if (obj.list[i].dt_txt.split(" ")[1] === "12:00:00" || i === 0) {
        const day = new DayData(
          location,
          obj.list[i].dt_txt.split(" ")[1],
          obj.list[i].dt_txt.split(" ")[0],
          obj.list[i].main.temp,
          obj.list[i].weather[0].id,
          obj.list[i].pop,
          obj.list[i].wind.speed,
          obj.list[i].wind.deg
        );
        this.daysArray.push(day);
      }
    }
    console.log(this.daysArray);
    displayWeather();
  },
};

class DayData {
  constructor(
    location,
    time,
    date,
    temperature,
    weatherCode,
    probOfPrecip,
    windSpeed,
    windDeg
  ) {
    this.location = location;
    this.time = time;
    this.date = date;
    this.temperature = temperature;
    this.weatherCode = weatherCode;
    this.probOfPrecip = probOfPrecip;
    this.windSpeed = windSpeed;
    this.windDeg = windDeg;
  }
}

function displayWeather() {
  let currentTemperature = weather.daysArray[0].temperature;
  domItems().temperatureMain.textContent = `${Math.round(currentTemperature)}º`;

  console.log(domItems().symbolMain.src);
  let currentSymbol = iconKey(weather.daysArray[0].weatherCode);
  domItems().symbolMain.src = `symbols/${currentSymbol}.svg`;
}
