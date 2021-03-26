function formatDate(date) {
  const dateObj = new Date(date);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[dateObj.getDay()];
  const dateNum = dateObj.getDate();

  let suffix;
  switch (true) {
    case dateNum === 1:
    case dateNum === 21:
    case dateNum === 31:
      suffix = "st";
      break;
    case dateNum === 2:
    case dateNum === 22:
      suffix = "nd";
      break;
    case dateNum === 3:
    case dateNum === 23:
      suffix = "rd";
      break;
    default:
      suffix = "th";
  }
  return `${day} ${dateNum}${suffix}`;
}
export default formatDate;
