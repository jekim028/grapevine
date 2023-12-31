import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import {
  Title2Primary,
  TextMedSecondaryBold,
  TextMedPrimaryBold,
} from "../../components/general/Text";

import { YourRequestsSection } from "../../components/inbox/yourRequests";
import { FriendsRequestsSection } from "../../components/inbox/friendsRequests";
import {
  yourCompletedRequestsData,
  yourPendingRequestsData,
  friendsCompletedRequestsData,
  friendsPendingRequestsData,
} from "../../lib/inbox-data";
import { useRequests } from "../../utils/RequestProvider";
import { useAuth } from "../../utils/AuthProvider";
import { supabase } from "../../utils/supabase";

export default function Page() {
  const [isOnYours, setIsOnYours] = useState(true);
  const { requests } = useRequests();
  const { user } = useAuth();

  const [yourRequests, setYourRequests] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    const newYourRequests = requests.filter(
      (request) => request.user_id === user.id
    );
    const newFriendRequests = requests.filter(
      (request) => request.user_id !== user.id
    );

    setYourRequests(newYourRequests);
    setFriendRequests(newFriendRequests);
  }, [requests, user.id]);

  const Toggle = () => {
    return (
      <View style={styles.toggle}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setIsOnYours(false)}
        >
          {isOnYours && (
            <View style={styles.notActivatedToggle}>
              <TextMedSecondaryBold text={"Friends' Requests"} />
            </View>
          )}
          {!isOnYours && (
            <View style={styles.activatedToggle}>
              <TextMedPrimaryBold text={"Friends' Requests"} />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setIsOnYours(true)}
        >
          {isOnYours && (
            <View style={styles.activatedToggle}>
              <TextMedPrimaryBold text={"Your Requests"} />
            </View>
          )}
          {!isOnYours && (
            <View style={styles.notActivatedToggle}>
              <TextMedSecondaryBold text={"Your Requests"} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%" }}>
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                gap: padding.sm,
              }}
            >
              <Image
                source={require("../../assets/imgs/Grape.jpg")}
                style={{ width: 32, height: 33 }}
              />
              <Title2Primary text={"Grapevine"} />
            </View>
          </View>
          <View style={styles.hasMargin}>
            <Toggle />
            {isOnYours && (
              <YourRequestsSection
                yourCompletedRequestsData={yourCompletedRequestsData}
                yourPendingRequestsData={yourRequests}
                setYourRequests={setYourRequests}
              />
            )}
            {!isOnYours && (
              <FriendsRequestsSection
                friendsCompletedRequestsData={friendsCompletedRequestsData}
                friendsPendingRequestsData={friendRequests}
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
    gap: 32,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    height: 54,
    borderRadius: padding.lg,
    padding: padding.xs,
  },
  rowContainerXs: {
    flexDirection: "row",
    gap: padding.xs,
    alignItems: "center",
    backgroundColor: "red",
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
    alignItems: "center",
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
  notActivatedToggle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activatedToggle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: padding.lg,
  },
});
