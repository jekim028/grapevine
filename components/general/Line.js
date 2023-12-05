import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
export const PaddedLine = () => {
  return (
    <View style={styles.paddedLineContainer}>
      <View style={styles.line} />
    </View>
  );
};

export const FullLine = () => {
  return (
    <View style={styles.fullLineContainer}>
      <View style={styles.fullLine} />
    </View>
  );
};

export const PartialLine = ({ width }) => {
  return (
    <View
      style={{
        width: width,
        height: 1,
        backgroundColor: colors.gray,
      }}
    />
  );
};

const styles = StyleSheet.create({
  paddedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: padding.med,
  },
  fullLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  fullLine: {
    height: 2,
    backgroundColor: colors.gray,
    width: "100%",
  },
  line: {
    height: 0.5,
    backgroundColor: colors.gray,
    width: "100%",
  },
});
