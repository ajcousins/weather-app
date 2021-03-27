import apiKey from "./api-key";
import iconKey from "./icon-key";
import domItems from "./dom-items";
import weatherDescription from "./weather-description";
import colourHex from "./colourHex";
import getBarHeights from "./get-bar-heights";
import formatDate from "./format-date";
import windDir from "./wind-dir";
import getBackgroundCode from "./get-background-code";
import calculateNoon from "./calculate-noon";

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
    // console.log(obj);
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
    // console.log(this.daysArray);
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

function displayCurrentWeather() {
  let currentTemperature = weather.daysArray[0].temperature;
  domItems().temperatureMain.textContent = `${Math.round(currentTemperature)}º`;

  let currentSymbol = iconKey(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight
  );
  domItems().symbolMain.src = `symbols/${currentSymbol}.svg`;

  let descriptiveText = weatherDescription(weather.daysArray[0]);
  domItems().nowDescription.textContent = descriptiveText;

  let tempHex = colourHex(Math.round(weather.daysArray[0].temperature));
  domItems().nowTempBar.setAttribute("style", `background-color: #${tempHex}`);

  domItems().nowTitle.textContent = `Current weather for ${weather.daysArray[0].location}...`;
}

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

function setBackground() {
  let code = getBackgroundCode(
    weather.daysArray[0].weatherCode,
    weather.daysArray[0].dayNight
  );

  domItems().backgroundMain.className = "";
  domItems().backgroundMain.classList.add(`${code}`);

  for (let i = 0; i < domItems().containers.length; i++) {
    if (code === "night")
      domItems().containers[i].classList.add("lightContainer");
    else domItems().containers[i].classList.remove("lightContainer");
  }
}
