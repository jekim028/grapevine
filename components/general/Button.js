import { View, StyleSheet } from "react-native";
import {
  TextMedAccent,
  TextMedInverted,
  TextMedInvertedBold,
  TextMedPrimary,
} from "./Text";
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
});
