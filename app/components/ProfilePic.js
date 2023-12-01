import { View, Image, StyleSheet } from "react-native";
import * as People from "../../assets/imgs/people";

const ProfilePic = ({ size, person, hasBorder, borderColor }) => {
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

export default ProfilePic;
