import { View, StyleSheet } from "react-native";
import {
  TextMedAccent,
  TextMedInverted,
  TextMedInvertedBold,
  TextMedPrimary,
} from "./Text";
import { useState } from "react";
import { colors } from "../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const AccentButton = ({ text, action }) => {
  return (
    <View style={styles.accentButton}>
      <TextMedInverted text={text} />
    </View>
  );
};

export const InvertedButton = ({ text, action }) => {
  return (
    <View style={styles.invertedButton}>
      <TextMedAccent text={text} />
    </View>
  );
};

export const AnonymousToggleButton = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleToggle = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <View style={styles.toggleButton}>
      <TouchableOpacity
        style={isAnonymous ? styles.buttonOn : styles.buttonOff}
        onPress={handleToggle}
      >
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  accentButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: colors.grapevine,
  },
  invertedButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.grapevine,
  },
  toggleButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOn: {
    width: 56, // Width of the toggle
    height: 30,
    paddingHorizontal: 4,
    backgroundColor: colors.grapevine,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonOff: {
    width: 56, // Width of the toggle
    height: 30,
    paddingHorizontal: 4,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "start",
  },
  dot: {
    height: 20, // Height of the dot
    width: 20, // Width of the dot
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
