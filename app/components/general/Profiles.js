import { View, Image, StyleSheet } from "react-native";
import * as People from "../../../assets/imgs/people";

export const ProfilePicURL = ({ size, uri, hasBorder, borderColor }) => {
  const styles = StyleSheet.create({
    profilePic: {
      borderRadius: 1000000,
      width: size,
      height: size,
      borderWidth: hasBorder ? 2 : 0,
      borderColor: hasBorder ? borderColor : null,
    },
  });
  return <Image source={{ uri: uri }} style={styles.profilePic} />;
};

export const ProfilePic = ({ size, uri, hasBorder, borderColor }) => {
  const styles = StyleSheet.create({
    profilePic: {
      borderRadius: 1000000,
      width: size,
      height: size,
      borderWidth: hasBorder ? 2 : 0,
      borderColor: hasBorder ? borderColor : null,
    },
  });
  return <Image source={{ uri: uri }} style={styles.profilePic} />;
};

export const OverlappingProfiles = ({ people }) => {
  return (
    <View style={styles.overlappingProfiles}>
      {people.map((person) => {
        if (person.avatar_url) {
          return (
            <ProfilePicURL
              size={32}
              uri={person.avatar_url}
              hasBorder={true}
              borderColor={"white"}
              key={person.id}
            />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  overlappingProfiles: {
    flexDirection: "row-reverse",
    gap: -21,
  },
});
