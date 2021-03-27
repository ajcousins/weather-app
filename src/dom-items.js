function domItems() {
  const background = document.querySelector("html");
  const nowTitle = document.querySelector("#nowTitle");
  // console.log(nowTitle);
  const temperatureMain = document.querySelector(".temperatureMain");
  const symbolMain = document.querySelector(".symbolMain");
  const nowDescription = document.querySelector("#nowText");
  const nowTempBar = document.querySelector(".nowTempBar");

  const searchInput = document.querySelector(".searchBox");
  const searchSymbol = document.querySelector(".searchSymbol");

  const bars = document.querySelectorAll(".bar");
  const symbolCard = document.querySelectorAll(".symbolCard");
  const colourZone = document.querySelectorAll(".colourZone");
  const tempZone = document.querySelectorAll(".tempZone");
  const infoZone = document.querySelectorAll(".infoZone");
  const windDir = document.querySelectorAll(".windDir");
  const windVal = document.querySelectorAll(".windVal");
  const rainVal = document.querySelectorAll(".rainVal");
  const date = document.querySelectorAll(".date");

  // Backgrounds
  const backgroundMain = document.querySelector("html");
  const containers = document.querySelectorAll(".screen");

  return {
    background,
    nowTitle,
    temperatureMain,
    symbolMain,
    nowDescription,
    nowTempBar,
    searchInput,
    searchSymbol,
    bars,
    symbolCard,
    colourZone,
    tempZone,
    infoZone,
    windDir,
    windVal,
    rainVal,
    date,
    backgroundMain,
    containers,
  };
}
export default domItems;
