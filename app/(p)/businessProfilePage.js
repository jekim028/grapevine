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
  TextXsAccent,
  TextXsSecondary,
  TextXsPrimary,
  TextXsPrimaryBold,
  TextSmPrimary,
  TextSmPrimaryBold,
  TextMedPrimary,
  TextMedSecondary,
  TextMedPrimaryBold,
  TextSmSecondary,
  TextLgBold,
  Title3Primary,
  Title3PrimaryBold,
} from "../components/general/Text";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";

import {
  ProfilePic,
  OverlappingProfiles,
} from "../components/general/Profiles";

import { BusinessActionLine } from "../components/businessProfiles/BusinessActionLine";
import { RecommendersDetails } from "../components/businessProfiles/RecommendersDetails";
import Pill from "../components/general/Pill";
import { PaddedLine } from "../components/general/Line";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const BusinessProfileReview = ({ person, name, degree, reviewText }) => {
  return (
    <View style={styles.businessProfileReview}>
      <View style={styles.rowContainerMed}>
        <ProfilePic size={32} person={person} hasBorder={false} />
        <View style={styles.rowContainerSm}>
          <TextMedPrimaryBold text={name} />
          <TextMedSecondary text={"•"} />
          <TextMedSecondary text={degree} />
        </View>
      </View>
      <TextMedPrimary text={reviewText} />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name={"chevron-back"} size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.headerButton}>
        <Ionicons
          name={"bookmark-outline"}
          size={24}
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

const BusinessDetails = ({ business }) => {
  console.log(business);
  return (
    <View style={styles.section}>
      <View style={styles.colContainerMed}>
        <View style={styles.colContainerXs}>
          <Title3PrimaryBold text={business.name} />
          {/* <RecommendersDetails
            person1={"Chelsea"}
            person2={"Ariane"}
            person3={"Emily"}
            first={"Chelsea Cho (2nd)"}
            second={"Ariane Lee (2nd)"}
            third={" 6 others"}
          /> */}
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
              text={business.phone}
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

const ReviewScroll = () => {
  const reviewData = [
    {
      person: "Chelsea",
      name: "Chelsea Cho",
      degree: "2nd",
      reviewText:
        "“He knew exactly what was wrong with my car when it was making a weird sound. Best quote in the area!”",
    },
    {
      person: "Ariane",
      name: "Ariane Lee",
      degree: "2nd",
      reviewText:
        "“Quick and efficient! They fixed my brakes faster than expected. Definitely the best service around!”",
    },
    {
      person: "Tobey",
      name: "Tobey MacIntosh",
      degree: "2nd",
      reviewText:
        "“Superb attention to detail. They found and repaired a leak I didn't even know I had. Top-notch work!”",
    },
    {
      person: "Emily",
      name: "Emily Deng",
      degree: "3rd",
      reviewText:
        "“Great customer experience! They explained everything clearly and had my car running smoothly in no time. Highly recommend!”",
    },
    {
      person: "Jenna",
      name: "Jenna Kim",
      degree: "3rd",
      reviewText:
        "“Incredible diagnostics! Solved an engine issue that others couldn’t. The most reliable mechanic I’ve found.”",
    },
    {
      person: "StockPerson1",
      name: "Michael Weinstein",
      degree: "3rd",
      reviewText:
        "“Fantastic turnaround time. Got my AC fixed just in time for summer. Can't beat their prices and quality!”",
    },
    {
      person: "StockPerson2",
      name: "Ella Brown",
      degree: "3rd",
      reviewText:
        "“Really knowledgeable team. They handled my transmission problem with ease. Best value for money in town!”",
    },
    {
      person: "StockPerson3",
      name: "Kyle Haslett",
      degree: "3rd",
      reviewText:
        "“Outstanding service! They went above and beyond to ensure my car was in perfect condition. Trustworthy and efficient.”",
    },
  ];
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
        {reviewData.map((item) => (
          <BusinessProfileReview
            person={item.person}
            name={item.name}
            degree={item.degree}
            reviewText={item.reviewText}
            key={item.person}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Map = () => {
  return <Image source={require("../../assets/imgs/map.jpg")} />;
};

const TotalRecommendations = () => {
  return (
    <View>
      <TextLgBold text={"8 recommendations"} />
      <View style={styles.rowContainerSm}>
        <TextXsPrimary text={"3 second degree friends"} />
        <TextXsPrimary text={"•"} />
        <TextXsPrimary text={"5 third degree friends"} />
      </View>
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

const RecommendationsDetails = () => {
  return (
    <View style={styles.section}>
      <TotalRecommendations />
      <ReviewKeyMentions />
    </View>
  );
};

export default function businessProfilePage() {
  const [data, setData] = useState([]);
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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />
          <BusinessPhotosScroll />
          <BusinessDetails business={data} />
          <PaddedLine />
          {/* <RecommendationsDetails />
          <ReviewScroll /> */}
          <Map />
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
