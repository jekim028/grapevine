import { View, Image, StyleSheet } from "react-native";
import { padding } from "../../styles/spacing";
import { TextMedPrimaryBold, TextMedSecondary, TextSmSecondary } from "./Text";
import { numberToStringWithEnding } from "../functions/numberToStringWithEnding";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";

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
            <ProfilePic
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

export const ProfileWithDegreeAndTimestamp = ({ user, timestamp }) => {
  const degree = numberToStringWithEnding(user.degree, true);
  const { profile } = useAuth();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  useEffect(() => {
    if (user && profile) {
      if (user.id == profile.id) {
        setIsCurrentUser(true);
      }
    }
  }, [profile, user]);

  return (
    <View style={styles.rowContainerMed}>
      <ProfilePic size={40} uri={user.avatar_url} hasBorder={false} />
      <View style={{ gap: 2 }}>
        <View style={styles.rowContainerSm}>
          <TextMedPrimaryBold text={user.first_name + " " + user.last_name} />
          {!isCurrentUser && <TextMedSecondary text={degree} />}
        </View>
        <TextSmSecondary text={timestamp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlappingProfiles: {
    flexDirection: "row-reverse",
    gap: -21,
  },
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
    alignItems: "center",
  },
});
