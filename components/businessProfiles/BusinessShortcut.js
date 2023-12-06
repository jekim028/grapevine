import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextSmSecondary, TextMedPrimaryBold } from "../general/Text";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import { router } from "expo-router";

export const BusinessShortcut = ({
  businessId,
  businessName,
  numRecommendations,
  businessType,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(p)/businessProfilePage",
          params: { business_id: businessId },
        })
      }
      style={styles.businessContainer}
    >
      <View style={styles.businessTextContainer}>
        <TextMedPrimaryBold text={businessName} />
        <View style={styles.rowContainerSm}>
          <TextSmSecondary text={`${numRecommendations} recommendations`} />
          <TextSmSecondary text={"•"} />
          <TextSmSecondary text={businessType} />
        </View>
      </View>
      <Ionicons
        name={"bookmark-outline"}
        size={32}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  businessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.gray,
    padding: 16,
    gap: padding.xs,
  },
  businessTextContainer: {
    gap: padding.xs,
  },
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
  },
});
