import { withLayoutContext } from "expo-router";

export function numberToStringWithEnding(number, withParen) {
  if (withParen) {
    if (number === 1) {
      return "(1st)";
    } else if (number === 2) {
      return "(2nd)";
    } else if (number === 3) {
      return "(3rd)";
    } else {
      return "Invalid input";
    }
  } else {
    if (number === 1) {
      return "1st";
    } else if (number === 2) {
      return "2nd";
    } else if (number === 3) {
      return "3rd";
    } else {
      return "Invalid input";
    }
  }
}
