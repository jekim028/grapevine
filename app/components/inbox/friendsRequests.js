import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { padding } from "../../../styles/spacing";
import { colors } from "../../../styles/colors";
import { ProfilePic, ProfileWithDegreeAndTimestamp } from "../general/Profiles";
import {
  TextLgSecondaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
  TextSmSecondaryBold,
} from "../general/Text";
import { BusinessShortcut } from "../businessProfiles/BusinessShortcut";
import { InvertedButton, AccentButton } from "../general/Button";
import { PartialLine } from "../general/Line";

const RequestButtons = ({ text1, text2 }) => {
  return (
    <View style={styles.rowContainerMed}>
      <InvertedButton text={text1} />
      <AccentButton text={text2} />
    </View>
  );
};

const FriendsPendingRequest = ({
  personPic,
  name,
  degree,
  requestType,
  timestamp,
  requestText,
}) => {
  return (
    <View style={styles.pendingRequest}>
      <View style={styles.rowContainerMed}>
        {/* <ProfilePic size={32} person={personPic} /> */}
        <View style={styles.colContainerSm}>
          <View style={styles.colContainerXxs}>
            <View style={styles.rowContainerLg}>
              <View style={styles.rowContainerXsWrap}>
                <TextMedPrimaryBold text={name} />
                <TextMedPrimary text={"requested a"} />
                <TextMedPrimaryBold text={requestType} />
              </View>
              <TextSmSecondary text={degree} />
            </View>

            <TextSmSecondary text={timestamp} />
          </View>

          {/* // lowkey need to fix this wrapping!! */}
          <Text style={{ flexWrap: "wrap" }}>{requestText}</Text>
        </View>
      </View>
      <RequestButtons text1={"Cancel"} text2={"Create"} />
    </View>
  );
};

const FriendsPendingRequestsSection = ({ data }) => {
  return (
    <View>
      <TextLgSecondaryBold text={"Pending Requests"} />
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {data.map((item) => (
          <FriendsPendingRequest
            personPic={item.personPic}
            name={item.name}
            degree={item.degree}
            requestType={item.requestType}
            timestamp={item.timestamp}
            requestText={item.requestText}
            key={item.requestText}
          />
        ))}
      </View>
    </View>
  );
};

const FriendsCompletedRequest = ({
  personPic,
  name,
  degree,
  requestType,
  timestamp,
}) => {
  return (
    <View style={styles.completedRequest}>
      <View style={styles.rowContainerMed}>
        {/* <ProfilePic size={32} person={personPic} /> */}
        <View style={styles.colContainerXxs}>
          <View style={styles.rowContainerLg}>
            <View style={styles.rowContainerXsWrap}>
              <TextMedPrimaryBold text={`${name}'s`} />
              <TextMedPrimary text={`${requestType} request`} />
            </View>
            <TextSmSecondary text={degree} />
          </View>
          <TextSmSecondary text={timestamp} />
        </View>
      </View>
    </View>
  );
};

const FriendsCompletedRequestsSection = ({ data }) => {
  return (
    <View>
      <TextLgSecondaryBold text={"Completed Requests"} />
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {data.map((item) => (
          <FriendsCompletedRequest
            personPic={item.personPic}
            name={item.name}
            degree={item.degree}
            requestType={item.requestType}
            timestamp={item.timestamp}
            key={item.requestType}
          />
        ))}
      </View>
    </View>
  );
};

export const FriendsRequestsSection = ({
  friendsCompletedRequestsData,
  friendsPendingRequestsData,
}) => {
  return (
    <View style={styles.colContainerMed}>
      <FriendsPendingRequestsSection data={friendsPendingRequestsData} />
      <FriendsCompletedRequestsSection data={friendsCompletedRequestsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
  },
  header: {
    padding: padding.med,
  },
  hasMargin: {
    paddingHorizontal: padding.med,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    height: 54,
    borderRadius: padding.lg,
  },
  rowContainerXs: {
    flexDirection: "row",
    gap: padding.xs,
    alignItems: "center",
  },
  rowContainerLg: {
    display: "flex",
    flexDirection: "row",
    gap: padding.lg,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  rowContainerXsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: padding.xs,
    alignItems: "center",
    flexShrink: 1,
  },
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
    flexShrink: 1,
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
    flexShrink: 1,
    alignItems: "start",
    flexShrink: 1,
  },
  colContainerSm: {
    flexDirection: "col",
    gap: padding.sm,
    flexShrink: 1,
  },
  colContainerXs: {
    flexDirection: "col",
    gap: padding.xs,
    flexShrink: 1,
  },
  colContainerXxs: {
    flexDirection: "col",
    gap: padding.xxs,
    flexShrink: 1,
  },
  colContainerXsWrap: {
    flexDirection: "col",
    gap: padding.xs,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  colContainerMed: {
    flexDirection: "col",
    gap: padding.med,
    flexShrink: 1,
  },
  pendingRequest: {
    paddingVertical: padding.lg,
    gap: padding.med,
    backgroundColor: "white",
  },
  completedRequest: {
    paddingVertical: padding.med,
    backgroundColor: "white",
  },
});
