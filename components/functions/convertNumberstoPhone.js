export function convertNumberstoPhone(num) {
  const str = num.toString();
  if (str.length === 10) {
    return `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6)}`;
  } else {
    return str;
  }
}
