import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import {
  TextLgSecondaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
} from "../general/Text";
import { InvertedButton, AccentButton } from "../general/Button";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { ProfilePic } from "../general/Profiles";
import { convertTimestampFromIso } from "../functions/convertTimestampFromIso";
import { numberToStringWithEnding } from "../functions/numberToStringWithEnding";
import { router } from "expo-router";
import { useAuth } from "../../utils/AuthProvider";

function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}

const FriendsRequestButtons = ({
  text1,
  text2,
  friendRequestId,
  setFriendRequests,
}) => {
  const removeItem = (id) => {
    setFriendRequests((oldData) => oldData.filter((item) => item.id !== id));
    console.log("cancel request!");
  };

  return (
    <View style={styles.rowContainerMed}>
      <TouchableOpacity
        onPress={() => {
          showSuccessToast("Friend's Request Cancelled");
          removeItem(friendRequestId);
        }}
        style={{ flex: 1 }}
      >
        <InvertedButton text={text1} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(p)/leaveRecSearch",
            params: {
              fromFriendRequests: true,
              friendRequestId: friendRequestId,
            },
          })
        }
        style={{ flex: 1 }}
      >
        <AccentButton text={text2} />
      </TouchableOpacity>
    </View>
  );
};

const FriendsPendingRequest = ({
  user_id,
  requestType,
  timestamp,
  requestText,
  id,
  setFriendRequests,
}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, degree, avatar_url")
        .eq("id", user_id);

      if (error) console.log("error", error);

      setUser(data[0]);
    };
    getUser();
  }, []);

  return (
    <View style={styles.pendingRequest}>
      <View style={styles.rowContainerMed}>
        <ProfilePic size={32} uri={user.avatar_url} />
        <View style={styles.colContainerSm}>
          <View style={styles.colContainerXxs}>
            <View style={styles.rowContainerLg}>
              <View style={styles.rowContainerXsWrap}>
                <TextMedPrimaryBold text={user.first_name} />
                <TextMedPrimary text={"requested a"} />
                <TextMedPrimaryBold text={requestType} />
              </View>
              <TextSmSecondary
                text={numberToStringWithEnding(user.degree, false)}
              />
            </View>

            <TextSmSecondary text={convertTimestampFromIso(timestamp)} />
          </View>
          <Text style={{ flexWrap: "wrap" }}>{requestText}</Text>
        </View>
      </View>
      <FriendsRequestButtons
        text1={"Cancel"}
        text2={"Create"}
        friendRequestId={id}
        setFriendRequests={setFriendRequests}
      />
    </View>
  );
};

const FriendsPendingRequestsSection = ({ data, setFriendRequests }) => {
  return (
    <View>
      <TextLgSecondaryBold text={"Pending Requests"} />
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {data.map((item) => (
          <FriendsPendingRequest
            user_id={item.user_id}
            requestType={item.category}
            timestamp={item.created_at}
            requestText={item.message}
            id={item.id}
            setFriendRequests={setFriendRequests}
            key={item.id}
          />
        ))}
      </View>
    </View>
  );
};

const FriendsCompletedRequest = ({ request }) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, degree, avatar_url")
        .eq("id", request.user_id);

      if (error) console.log("error", error);

      setProfile(data[0]);
    };
    getUser();
  }, []);

  return (
    <View style={styles.completedRequest}>
      <View style={styles.rowContainerMed}>
        <ProfilePic size={32} uri={profile.avatar_url} />
        <View style={styles.colContainerXxs}>
          <View style={styles.rowContainerLg}>
            <View style={styles.rowContainerXsWrap}>
              <TextMedPrimaryBold text={`${profile.first_name}'s`} />
              <TextMedPrimary text={`${request.category} request`} />
            </View>
            <TextSmSecondary
              text={numberToStringWithEnding(profile.degree, false)}
            />
          </View>
          <TextSmSecondary text={profile.created_at} />
        </View>
      </View>
    </View>
  );
};

const FriendsCompletedRequestsSection = ({
  data,
  completedRequests,
  friendRecs,
}) => {
  return (
    <View>
      <TextLgSecondaryBold text={"Completed Requests"} />
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {completedRequests &&
          completedRequests.map((item) => {
            const matchingRow = friendRecs.find(
              (rec) => rec.request_id === item.id
            );
            return (
              <FriendsCompletedRequest
                request={item}
                rec_id={matchingRow.rec_id}
                key={matchingRow.rec_id}
              />
            );
          })}
      </View>
    </View>
  );
};

export const FriendsRequestsSection = ({
  friendsCompletedRequestsData,
  friendsPendingRequestsData,
  friendRequests,
  setFriendRequests,
}) => {
  const [pendingRequests, setPendingRequests] = useState(friendRequests);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [friendRecs, setFriendRecs] = useState([]);
  const { session, user } = useAuth();

  useEffect(() => {
    const getRequestResponses = async () => {
      const { data, error } = await supabase
        .from("request-responses")
        .select("*")
        .eq("responder_id", user.id);

      if (error) {
        console.error(error);
      }
      setFriendRecs(data);
    };

    getRequestResponses();
  }, [friendRequests]);

  const handleRecordUpdated = (payload) => {
    console.log("Record updated!", payload);
    setfriendRecs((oldData) =>
      oldData.map((post) => {
        if (post.id === payload.new.id) {
          return payload.new;
        } else {
          return post;
        }
      })
    );
  };

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setFriendRecs((oldData) => [payload.new, ...oldData]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setFriendRecs((oldData) =>
      oldData.filter((post) => post.id !== payload.old.id)
    );
  };

  useEffect(() => {
    if (session) {
      const subscription = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "request-responses" },
          handleRecordUpdated
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "request-responses" },
          handleRecordInserted
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "request-responses" },
          handleRecordDeleted
        )
        .subscribe();

      return () => supabase.removeAllChannels();
    }
  }, [session]);

  useEffect(() => {
    if (friendRecs) {
      const requestIds = friendRecs.map((request) => request.request_id);
      const unseen = requestIds
        ? friendRequests.filter((request) => !requestIds.includes(request.id))
        : [];
      setPendingRequests(unseen);
      const seen = requestIds
        ? friendRequests.filter((request) => requestIds.includes(request.id))
        : [];
      setCompletedRequests(seen);
    }
  }, [friendRecs]);

  return (
    <View style={styles.colContainerMed}>
      <FriendsPendingRequestsSection
        data={pendingRequests}
        setFriendRequests={setFriendRequests}
      />
      <FriendsCompletedRequestsSection
        data={friendsCompletedRequestsData}
        completedRequests={completedRequests}
        friendRecs={friendRecs}
      />
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
  },
  requestButtonsContainer: {
    flexDirection: "row",
    gap: padding.med,
    flexShrink: 1,
    alignItems: "center",
    flexShrink: 1,
    width: "100%",
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
