import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Touchable,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TextXsPrimary,
  TextSmPrimary,
  TextMedPrimary,
  TextMedSecondary,
  TextMedPrimaryBold,
  TextLgPrimaryBold,
  Title3PrimaryBold,
} from "../../components/general/Text";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import { iconSize } from "../../styles/base";

import {
  ProfilePic,
  OverlappingProfiles,
} from "../../components/general/Profiles";

import { BusinessActionLine } from "../../components/businessProfiles/BusinessActionLine";
import { RecommendersDetails } from "../../components/businessProfiles/RecommendersDetails";
import { Pill } from "../../components/general/Pill";
import { PaddedLine } from "../../components/general/Line";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { numberToStringWithEnding } from "../../components/functions/numberToStringWithEnding";
import { convertNumberstoPhone } from "../../components/functions/convertNumberstoPhone";

const windowWidth = Dimensions.get("window").width;

const BusinessProfileReview = ({ review }) => {
  const [profile, setProfile] = useState([]);
  const { message, user_id, visibility } = review;

  useEffect(() => {
    const getProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user_id);
      if (error) {
        console.error("Error fetching data:", error);
      }
      setProfile(data[0]);
    };

    getProfile();
  }, []);

  const degree = numberToStringWithEnding(profile.degree);

  return (
    <View style={styles.businessProfileReview}>
      <View style={styles.rowContainerMed}>
        {profile.avatar_url && (
          <ProfilePic size={32} uri={profile.avatar_url} hasBorder={false} />
        )}
        <View style={styles.rowContainerSm}>
          <TextMedPrimaryBold
            text={profile.first_name + " " + profile.last_name}
          />
          <TextMedSecondary text={degree} />
        </View>
      </View>
      <TextMedPrimary text={message} />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name={"chevron-back"}
          size={iconSize}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      <View style={styles.headerButton}>
        <Ionicons
          name={"bookmark-outline"}
          size={iconSize}
          color={colors.textPrimary}
        />
      </View>
    </View>
  );
};

export const BusinessPhotosScroll = () => {
  return (
    <View style={styles.imageScrollContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Image
          source={require("../../assets/imgs/mechanics/mech1.jpg")}
          style={{ width: 150, height: 150 }}
        />
        <Image
          source={require("../../assets/imgs/mechanics/mech2.jpg")}
          style={{ width: 150, height: 150, borderRadius: 8 }}
        />
        <Image
          source={require("../../assets/imgs/mechanics/mech3.jpg")}
          style={{ width: 150, height: 150, borderRadius: 8 }}
        />
      </ScrollView>
    </View>
  );
};

const BusinessDetails = ({ business, recs }) => {
  let people = [];
  recs.map((item) => {
    people.push(item.user_id);
  });
  console.log("NUmber", business.phone);

  // const convertedNumber = convertNumberstoPhone(business.phone);

  return (
    <View style={styles.section}>
      <View style={styles.colContainerMed}>
        <View style={styles.colContainerXs}>
          <Title3PrimaryBold text={business.name} />
          <RecommendersDetails people={people} num_recs={business.num_recs} />
        </View>
        <View style={styles.colContainerSm}>
          {business.address && (
            <BusinessActionLine
              iconName={"location"}
              iconSize={16}
              iconColor={colors.grapevine}
              text={business.address}
            />
          )}
          {business.phone && (
            <BusinessActionLine
              iconName={"call"}
              iconSize={16}
              iconColor={colors.grapevine}
              text={convertNumberstoPhone(business.phone)}
            />
          )}
          {business.website && (
            <BusinessActionLine
              iconName={"globe"}
              iconSize={16}
              iconColor={colors.grapevine}
              text={business.website}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const ReviewScroll = ({ recs }) => {
  return (
    <View
      style={{
        marginTop: -padding.sm,
        marginBottom: padding.med,
        width: windowWidth,
      }}
    >
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {recs.map((item) => (
          <BusinessProfileReview review={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

const Map = () => {
  return <Image source={require("../../assets/imgs/map.jpg")} />;
};

const TotalRecommendations = ({ totalNumRecs }) => {
  return (
    <View>
      <TextLgPrimaryBold text={`${totalNumRecs} recommendations`} />
      {/* <View style={styles.rowContainerSm}>
        <TextXsPrimary text={"3 second degree friends"} />
        <TextXsPrimary text={"•"} />
        <TextXsPrimary text={"5 third degree friends"} />
      </View> */}
    </View>
  );
};

const ReviewKeyMentions = () => {
  return (
    <View style={styles.colContainerXs}>
      <TextSmPrimary text={"Key Mentions"} />
      <View style={styles.rowContainerSm}>
        <Pill text1={"price"} text2={"2"} />
        <Pill text1={"friendly"} text2={"1"} />
      </View>
    </View>
  );
};

const RecommendationsDetails = ({ totalNumRecs }) => {
  return (
    <View style={styles.recommendationsDetails}>
      <TotalRecommendations totalNumRecs={totalNumRecs} />
      <ReviewKeyMentions />
    </View>
  );
};

export default function businessProfilePage() {
  const [data, setData] = useState([]);
  const [recs, setRecs] = useState([]);
  const { business_id } = useLocalSearchParams();

  useEffect(() => {
    const getBusiness = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select()
        .eq("id", business_id);
      if (error) {
        console.error("Error fetching data:", error);
        return null;
      }
      setData(data[0]);
    };

    getBusiness();
  }, []);

  useEffect(() => {
    const getRecs = async () => {
      const { data, error } = await supabase
        .from("recs")
        .select()
        .eq("business_id", business_id)
        .limit(3);

      if (error) {
        console.error("Error fetching recs:", error);
      }

      setRecs(data);
    };

    getRecs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <BusinessPhotosScroll />
          <BusinessDetails business={data} recs={recs} />
          <PaddedLine />
          <RecommendationsDetails totalNumRecs={recs.length} />
          <ReviewScroll recs={recs} />

          {data.address && <Map />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: padding.sm,
    paddingHorizontal: padding.med,
  },
  headerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 100000000,
  },
  imageScrollContainer: {
    height: 150,
    overflow: "visible",
    marginBottom: -padding.sm,
    width: windowWidth,
  },
  scroll: {
    display: "flex",
    paddingHorizontal: padding.med,
    gap: padding.sm,
    height: "auto",
    overflow: "visible",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: padding.med,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.med,
  },
  recommendationsDetails: {
    display: "flex",
    flexDirection: "column",
    gap: padding.sm,
    paddingVertical: padding.lg,
    paddingHorizontal: padding.med,
  },
  businessTopText: {
    display: "flex",
    flexDirection: "column",
    gap: padding.sm,
  },
  title3: {
    fontSize: 24,
    lineHeight: 28,
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
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
  },
  colContainerSm: {
    flexDirection: "col",
    gap: padding.sm,
  },
  colContainerXs: {
    flexDirection: "col",
    gap: padding.xs,
  },
  colContainerMed: {
    flexDirection: "col",
    gap: padding.med,
  },

  businessProfileReview: {
    flexDirection: "col",
    width: 326,
    gap: padding.med,
    padding: padding.med,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.gray,
  },
});
