import apiKey from "./api-key";
import iconKey from "./icon-key";
import domItems from "./dom-items";
import weatherDescription from "./weather-description";
import colourHex from "./colourHex";

const searchBar = {
  initialise() {
    console.log(domItems().searchInput);
    domItems().searchSymbol.addEventListener("click", () => {
      this.search();
    });
    domItems().searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.search();
    });
  },
  search() {
    if (!domItems().searchInput.value) {
      domItems().searchInput.blur();
      return;
    }
    weather.clearData();
    fetchData(domItems().searchInput.value);
    domItems().searchInput.setAttribute(
      "placeholder",
      "Enter a town or city name..."
    );
    domItems().searchInput.value = "";
    domItems().searchInput.blur();
  },
};
searchBar.initialise();

function fetchData(location) {
  if (!location) location = "London";
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
      domItems().searchInput.setAttribute(
        "placeholder",
        "Not a valid locaton."
      );
      console.error(error);
    });
}
fetchData();

const weather = {
  daysArray: [],
  handleData(obj) {
    console.log(obj);
    for (let i = 0; i < obj.list.length; i++) {
      // Get data for right now + next 5 days.
      if (obj.list[i].dt_txt.split(" ")[1] === "12:00:00" || i === 0) {
        const day = new DayData(
          obj.city.name,
          obj.list[i].dt_txt.split(" ")[1],
          obj.list[i].dt_txt.split(" ")[0],
          obj.list[i].main.temp,
          obj.list[i].weather[0].id,
          obj.list[i].pop,
          obj.list[i].main.humidity,
          obj.list[i].wind.speed,
          obj.list[i].wind.deg,
          obj.list[i].sys.pod,
          obj.list[i].weather[0].description
        );
        this.daysArray.push(day);
      }
    }
    console.log(this.daysArray);
    displayWeather();
  },
  clearData() {
    this.daysArray = [];
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
    humidity,
    windSpeed,
    windDeg,
    dayNight,
    description
  ) {
    this.location = location;
    this.time = time;
    this.date = date;
    this.temperature = temperature;
    this.weatherCode = weatherCode;
    this.probOfPrecip = probOfPrecip;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.windDeg = windDeg;
    this.dayNight = dayNight;
    this.description = description;
  }
}

function displayWeather() {
  let currentTemperature = weather.daysArray[0].temperature;
  domItems().temperatureMain.textContent = `${Math.round(
    currentTemperature
  )}ºC`;

  let currentSymbol = iconKey(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight
  );
  domItems().symbolMain.src = `symbols/${currentSymbol}.svg`;

  let descriptiveText = weatherDescription(weather.daysArray[0]);
  domItems().nowDescription.textContent = descriptiveText;

  let tempHex = colourHex(Math.round(weather.daysArray[0].temperature));
  domItems().nowTempBar.setAttribute("style", `background-color: #${tempHex}`);

  // console.log(domItems());
  domItems().nowTitle.textContent = `Current weather for ${weather.daysArray[0].location}...`;
}
