import { feedData } from "../lib/feed-data";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { ProfileWithDegreeAndTimestamp } from "../app/components/general/ProfileWithDegree";
import {
  Title3PrimaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
} from "../app/components/general/Text";
import { BusinessShortcut } from "../app/components/businessProfiles/BusinessShortcut";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FullLine } from "../app/components/general/Line";
import { padding } from "../styles/spacing";
import { colors } from "../styles/colors";
import * as FeedImgs from "../assets/imgs/feedImgs";

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
    <View style={styles.post}>
      <View style={styles.colContainerMed}>
        <ProfileWithDegreeAndTimestamp
          personPic={profilePic}
          name={poster}
          degree={degree}
          timestamp={timestamp}
        />
        <TextMedPrimary text={message} />
      </View>
      {hasPics && <PostImgs images={images} />}
      <BusinessShortcut
        businessName={businessName}
        numRecommendations={numRecommendations}
        businessType={businessType}
      />
    </View>
  );
};

const Feed = () => {
  return (
    <View style={styles.feed}>
      <View style={{ paddingHorizontal: padding.med }}>
        <Title3PrimaryBold text={"Activity"} />
      </View>
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {feedData.map((item) => (
          <FeedPost item={item} key={item.businessName} />
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
