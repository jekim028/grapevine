import { View, StyleSheet } from "react-native";
import { padding } from "../../../styles/spacing";
import { ProfilePic } from "./Profiles";
import { TextMedPrimaryBold, TextMedSecondary } from "./Text";

export const ProfileWithDegree = ({ personPic, name, degree }) => {
  return (
    <View style={styles.rowContainerMed}>
      <ProfilePic size={32} person={personPic} hasBorder={false} />
      <View style={styles.rowContainerSm}>
        <TextMedPrimaryBold text={name} />
        <TextMedSecondary text={"•"} />
        <TextMedSecondary text={degree} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
  },
});
