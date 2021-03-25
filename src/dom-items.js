function domItems() {
  const nowTitle = document.querySelector("#nowTitle");
  // console.log(nowTitle);
  const temperatureMain = document.querySelector(".temperatureMain");
  const symbolMain = document.querySelector(".symbolMain");
  const nowDescription = document.querySelector("#nowText");
  const nowTempBar = document.querySelector(".nowTempBar");

  const searchInput = document.querySelector(".searchBox");
  const searchSymbol = document.querySelector(".searchSymbol");

  return {
    nowTitle,
    temperatureMain,
    symbolMain,
    nowDescription,
    nowTempBar,
    searchInput,
    searchSymbol,
  };
}
export default domItems;
