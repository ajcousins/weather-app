import apiKey from "./api-key";

const location = "london";

fetch(
  `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey()}&units=metric`,
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    processData(response);
  })
  .catch(function (error) {
    console.log("Error");
    console.error(error);
  });

function processData(obj) {
  const daysArray = [];
  console.log(obj);
  console.log("temp:", obj.list[0].main.temp);
  console.log("code:", obj.list[0].weather[0].id);
  console.log("wind:", obj.list[0].wind.speed);

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
      daysArray.push(day);
    }
  }
  console.log(daysArray);
}

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
