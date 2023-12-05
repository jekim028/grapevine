export function convertTimestampFromIso(isoDateString) {
  const dateCreated = new Date(isoDateString);
  const currentDate = new Date();
  const millisecondsInASecond = 1000;
  const millisecondsInAMinute = 60 * millisecondsInASecond;
  const millisecondsInAnHour = 60 * 60 * 1000;
  const millisecondsIn24Hours = 24 * millisecondsInAnHour;
  const differenceInMilliseconds = currentDate - dateCreated;

  if (differenceInMilliseconds < millisecondsInAMinute) {
    return `1 min ago`;
  } else if (differenceInMilliseconds < millisecondsInAnHour) {
    const numMins = differenceInMilliseconds / millisecondsInAMinute;
    return `${numMins.toFixed(0)} mins ago`;
  } else if (differenceInMilliseconds < millisecondsIn24Hours) {
    const numHours = differenceInMilliseconds / millisecondsInAnHour;
    return `${numHours.toFixed(0)} hours ago`;
  } else {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return formatter.format(dateCreated);
  }
}
