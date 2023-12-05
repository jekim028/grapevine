import { View, StyleSheet } from "react-native";
import { padding } from "../../../styles/spacing";
import { ProfilePic } from "./Profiles";
import { TextMedPrimaryBold, TextMedSecondary } from "./Text";

export const ProfileWithDegreeURI = ({ profile }) => {
  const { avatar_url, first_name, last_name, degree } = profile;

  return (
    <View style={styles.rowContainerMed}>
      {avatar_url && (
        <ProfilePic size={32} uri={avatar_url} hasBorder={false} />
      )}
      <View style={styles.rowContainerSm}>
        <TextMedPrimaryBold text={first_name + " " + last_name} />
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
