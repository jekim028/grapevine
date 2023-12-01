import { View, Image, StyleSheet } from "react-native";
import * as People from "../../../assets/imgs/people";

export const ProfilePic = ({ size, person, hasBorder, borderColor }) => {
  const styles = StyleSheet.create({
    profilePic: {
      borderRadius: 1000000,
      width: size,
      height: size,
      borderWidth: hasBorder ? 2 : 0,
      borderColor: hasBorder ? borderColor : null,
    },
  });
  return <Image source={People[`${person}`]} style={styles.profilePic} />;
};

export const OverlappingProfiles = ({ person1, person2, person3 }) => {
  return (
    <View style={styles.overlappingProfiles}>
      <ProfilePic
        size={32}
        person={person3}
        hasBorder={true}
        borderColor={"white"}
      />
      <ProfilePic
        size={32}
        person={person2}
        hasBorder={true}
        borderColor={"white"}
      />
      <ProfilePic
        size={32}
        person={person1}
        hasBorder={true}
        borderColor={"white"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlappingProfiles: {
    flexDirection: "row-reverse",
    gap: -21,
  },
});
