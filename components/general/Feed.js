import { View, StyleSheet, Image } from "react-native";
import { ProfileWithDegreeAndTimestamp } from "./Profiles";
import {
  Title3PrimaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
} from "./Text";
import { BusinessShortcut } from "../businessProfiles/BusinessShortcut";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import * as FeedImgs from "../../assets/imgs/feedImgs";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { convertTimestampFromIso } from "../functions/convertTimestampFromIso";
import { useAuth } from "../../utils/AuthProvider";

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
    if (user_id) {
      const fetchProfile = async () => {
        const response = await supabase
          .from("profiles")
          .select()
          .eq("id", user_id);
        setProfile(response.data[0]);
      };
      fetchProfile();
    }
  }, [user_id]);

  const timestamp = convertTimestampFromIso(created_at);
  return (
    <View style={styles.post}>
      <View style={styles.colContainerMed}>
        <ProfileWithDegreeAndTimestamp user={profile} timestamp={timestamp} />
        <TextMedPrimary text={message} />
      </View>
      {/* {photos && <PostImgs images={images} />} */}
      <BusinessShortcut
        businessId={business.id}
        businessName={business.name}
        numRecommendations={business.num_recs}
        businessType={business.type}
      />
    </View>
  );
};

const Feed = ({ recs }) => {
  return (
    <View style={styles.feed}>
      <View style={{ paddingHorizontal: padding.med }}>
        <Title3PrimaryBold text={"Activity"} />
      </View>
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {recs.map((item) => (
          <FeedPost item={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  feed: {
    paddingTop: padding.lg,
  },
  post: {
    paddingHorizontal: padding.med,
    paddingVertical: padding.lg,
    gap: padding.med,
    backgroundColor: "white",
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
