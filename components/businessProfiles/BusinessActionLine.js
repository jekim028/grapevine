import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet } from "react-native";
import { TextXsSecondary, TextXsSecondaryUnderline } from "../general/Text";
import { padding } from "../../styles/spacing";

export const BusinessActionLine = ({ iconName, iconSize, iconColor, text }) => {
  return (
    <View style={styles.rowContainerSm}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <TextXsSecondaryUnderline text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
    width: "100%",
  },
});
