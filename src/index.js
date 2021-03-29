import "./styles.css";
import "./background-imgs";
import apiKey from "./api-key";
import domItems from "./dom-items";
import calculateNoon from "./calculate-noon";
import setBackground from "./set-background";
import displayForecast from "./display-forecast";
import displayCurrentWeather from "./display-current-weather";

const searchBar = {
  initialise() {
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
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey()}&units=metric`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weather.handleData(response);
    })
    .catch(function (error) {
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
    for (let i = 0; i < obj.list.length; i++) {
      // Get data for right now + next 5 days at noon.
      if (calculateNoon(obj)[i] === 12 || i === 0) {
        this.daysArray.push(this.makeNewDayObj(i, obj));
      }
    }
    // If there aren't enough days at 12:00.. use the last day from the set.
    if (this.daysArray.length === 5) {
      this.daysArray.push(this.makeNewDayObj(obj.list.length - 1, obj));
    }
    displayCurrentWeather();
    displayForecast();
    setBackground();
  },
  makeNewDayObj(i, obj) {
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
    return day;
  },
  clearData() {
    this.daysArray = [];
  },
};
export default weather;

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
