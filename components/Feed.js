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

const Feed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await supabase.from("recs").select("*").limit(5);
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.feed}>
      <View style={{ paddingHorizontal: padding.med }}>
        <Title3PrimaryBold text={"Activity"} />
      </View>
      {data.map((item) => (
        <FeedPost item={item} key={item.id} />
      ))}
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
