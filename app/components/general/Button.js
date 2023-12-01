import { View, StyleSheet } from "react-native";
import { TextMedAccent, TextMedInverted, TextMedPrimary } from "./Text";
import { colors } from "../../../styles/colors";

export const AccentButton = ({ text }) => {
  return (
    <View style={styles.accentButton}>
      <TextMedInverted text={text} />
    </View>
  );
};

export const InvertedButton = ({ text }) => {
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
    backgroundColor: colors.textInverted,
    borderWidth: 1,
    borderColor: colors.grapevine,
  },
});
