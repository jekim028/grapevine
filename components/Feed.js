import { feedData } from "../lib/feed-data";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { ProfileWithDegreeURI } from "../app/components/general/ProfileWithDegree";
import {
  Title3PrimaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
} from "../app/components/general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FullLine } from "../app/components/general/Line";
import { padding } from "../styles/spacing";
import { colors } from "../styles/colors";
import * as FeedImgs from "../assets/imgs/feedImgs";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const PostImgs = ({ images }) => {
  return (
    <View style={styles.rowContainerSm}>
      {images.map((item) => (
        <Image
          source={FeedImgs[`${item.pic}`]}
          style={styles.businessImg}
          key={item.pic}
        />
      ))}
    </View>
  );
};

const FeedPost = ({ item }) => {
  const {
    poster,
    profilePic,
    degree,
    businessName,
    numRecommendations,
    businessType,
    timestamp,
    hasPics,
    images,
    message,
  } = item;
  return (
    <View>
      <View style={styles.post}>
        <View style={styles.colContainerMed}>
          <ProfileWithDegree
            personPic={profilePic}
            name={poster}
            degree={degree}
          />
          <TextMedPrimary text={message} />
        </View>
        {hasPics && <PostImgs images={images} />}
        <View style={styles.businessContainer}>
          <View style={styles.businessTextContainer}>
            <TextMedPrimaryBold text={businessName} />
            <View style={styles.rowContainerSm}>
              <TextSmSecondary text={`${numRecommendations} recommendations`} />
              <TextSmSecondary text={"•"} />
              <TextSmSecondary text={businessType} />
            </View>
          </View>
          <Ionicons
            name={"bookmark-outline"}
            size={32}
            color={colors.textSecondary}
          />
        </View>
        <TextSmSecondary text={timestamp} />
      </View>
      <FullLine />
    </View>
  );
};

const Feed = () => {
  const [session, setSession] = useState(null);
  const [data, setData] = useState([]);

  const handleRecordUpdated = (payload) => {
    console.log("UDPATE", payload);
    setData((oldData) =>
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
    setData((oldData) => [...oldData, payload.new]);
  };

  const handleRecordDeleted = (payload) => {
    console.log("DELETE", payload);
    setData((oldData) => oldData.filter((post) => post.id !== payload.old.id));
  };

  // Get User Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("recs").select("*");
      setData(response.data);
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    // From https://supabase.com/docs/guides/realtime/concepts#postgres-changes
    if (session) {
      const subscription = supabase
        .channel("schema-db-changes")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "posts_secure" },
          handleRecordUpdated
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "posts_secure" },
          handleRecordInserted
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table: "posts_secure" },
          handleRecordDeleted
        )
        .subscribe();

      return () => supabase.removeAllChannels();
    }
  }, [session]);

  return (
    <View style={styles.feed}>
      <View style={{ paddingHorizontal: padding.med }}>
        <Title3PrimaryBold text={"Activity"} />
      </View>
      {data.map((item) => (
        <FeedPost2 item={item} key={item.id} />
      ))}
    </View>
  );
};

const FeedPost2 = ({ item }) => {
  const { business_id, message, created_at, photos, user_id, visibility } =
    item;

  const [business, setBusiness] = useState([]);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      const response = await supabase
        .from("businesses")
        .select()
        .eq("id", business_id);
      setBusiness(response.data[0]);
    };
    fetchBusiness();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await supabase
        .from("profiles")
        .select()
        .eq("id", user_id);
      setProfile(response.data[0]);
    };
    fetchProfile();
  }, []);

  return (
    <View>
      <View style={styles.post}>
        <View style={styles.colContainerMed}>
          <ProfileWithDegreeURI profile={profile} />
          <TextMedPrimary text={message} />
        </View>
        {photos && <PostImgs images={photos} />}
        <View style={styles.businessContainer}>
          <View style={styles.businessTextContainer}>
            <TextMedPrimaryBold text={business.name} />
            <View style={styles.rowContainerSm}>
              <TextSmSecondary text={`${business.num_recs} recommendations`} />
              <TextSmSecondary text={"•"} />
              <TextSmSecondary text={business.type} />
            </View>
          </View>
          <Ionicons
            name={"bookmark-outline"}
            size={32}
            color={colors.textSecondary}
          />
        </View>
        {/* <TextSmSecondary text={timestamp} /> */}
      </View>
      <FullLine />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  feed: {
    paddingVertical: padding.lg,
  },
  post: {
    // backgroundColor: "red",
    paddingHorizontal: padding.med,
    paddingVertical: padding.lg,
    gap: padding.med,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  businessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.gray,
    padding: 16,
    gap: padding.xs,
  },
  businessTextContainer: {
    gap: padding.xs,
  },
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
  },
  postImgsContainer: {
    flexDirection: "row",
    gap: padding.sm,
  },
  colContainerMed: {
    flexDirection: "col",
    gap: padding.med,
  },
  businessImg: {
    width: 80,
    aspectRatio: 1,
    borderRadius: padding.xs,
  },
});
