import { View } from "react-native";
import { TextXsAccent } from "./text/Text";

export const Pill = ({ text1, text2 }) => {
  return (
    <View style={styles.pill}>
      <TextXsAccent text={text1} />
      <TextXsAccent text={text2} />
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    display: "flex",
    flexDirection: "row",
    gap: padding.sm,
    padding: padding.sm,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grapevine,
  },
});
