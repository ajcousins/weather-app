function calculateNoon(obj) {
  const timeDiffThree = threeMultRound(obj.city.timezone / 3600);
  const times = [];
  for (let i = 0; i < obj.list.length; i++) {
    let timeString = obj.list[i].dt_txt.split(" ")[1];
    timeString.split(":")[0];
    let timeAdjusted = Number(timeString.split(":")[0]) + timeDiffThree;
    if (timeAdjusted >= 24) timeAdjusted -= 24;
    if (timeAdjusted < 0) timeAdjusted += 24;
    times.push(timeAdjusted);
  }

  return times;
}
export default calculateNoon;

function threeMultRound(x) {
  // Returns number rounded to nearest multiple of 3.
  return Math.round(x / 3) * 3;
}
