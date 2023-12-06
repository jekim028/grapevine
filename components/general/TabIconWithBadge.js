import Ionicons from "react-native-vector-icons/Ionicons";
import { TextSmInverted, TextSmInvertedBold } from "./Text";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const TabIconWithBadge = ({ iconName, badgeCount, color, size }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ionicons name={iconName} size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <TextSmInvertedBold text={badgeCount} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    // Style your badge here
    position: "absolute",
    right: -8,
    top: -6,
    width: 20,
    height: 20,
    backgroundColor: colors.red,
    borderRadius: 50000,
    justifyContent: "center",
    alignItems: "center",
  },
});
