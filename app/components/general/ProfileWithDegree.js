import { View, StyleSheet } from "react-native";
import { padding } from "../../../styles/spacing";
import { ProfilePic } from "./Profiles";
import { TextMedPrimaryBold, TextMedSecondary, TextSmSecondary } from "./Text";

export const ProfileWithDegreeAndTimestamp = ({
  personPic,
  name,
  degree,
  timestamp,
}) => {
  return (
    <View style={styles.rowContainerMed}>
      <ProfilePic size={32} person={personPic} hasBorder={false} />
      <View style={styles.colContainerXxs}>
        <View style={styles.rowContainerSm}>
          <TextMedPrimaryBold text={name} />
          <TextMedSecondary text={`(${degree})`} />
        </View>
        <TextSmSecondary text={timestamp} />
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
  colContainerXxs: {
    flexDirection: "col",
    gap: padding.xxs,
    flexShrink: 1,
  },
});
