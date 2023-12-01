import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Touchable,
} from "react-native";

import { Link } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Title3PrimaryBold } from "../../components/general/Text";
import { AccentButton, InvertedButton } from "../../components/general/Button";
import { colors } from "../../../styles/colors";
import { padding } from "../../../styles/spacing";
import { ImageScroll } from "../../components/general/ImageScroll";
import { BusinessActionLine } from "../../components/businessProfiles/BusinessActionLine";
import { RecommendersDetails } from "../../components/businessProfiles/RecommendersDetails";
import { FullLine } from "../../components/general/Line";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ActionButtons = () => {
  return (
    <View style={styles.rowContainerMed}>
      <InvertedButton text={"Call"} />
      <InvertedButton text={"Website"} />
    </View>
  );
};
const BusinessDetails = ({ businessName, address, recommenders, photos }) => {
  return (
    <View style={styles.section}>
      <View style={styles.colContainerMed}>
        <View style={styles.colContainerSm}>
          <View style={styles.colContainerXs}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title3PrimaryBold text={businessName} />
              <Ionicons
                name={"bookmark-outline"}
                size={24}
                color={colors.textPrimary}
              />
            </View>
            <BusinessActionLine
              iconName={"location"}
              iconSize={16}
              iconColor={colors.grapevine}
              text={address}
            />
          </View>
          <RecommendersDetails
            person1={photos.first}
            person2={photos.second}
            person3={photos.third}
            first={recommenders.first}
            second={recommenders.second}
            third={recommenders.third}
          />
        </View>
        <ActionButtons />
      </View>
    </View>
  );
};

const BusinessResult = ({ data }) => {
  const {
    recommendersText,
    recommendersPhotos,
    businessImgs,
    businessName,
    address,
  } = data;
  return (
    <View style={styles.result}>
      <ImageScroll height={100} images={businessImgs} />
      <BusinessDetails
        businessName={businessName}
        address={address}
        recommenders={recommendersText}
        photos={recommendersPhotos}
      />
    </View>
  );
};

const AllResults = () => {
  const data = [
    {
      recommendersText: {
        first: "Chelsea Cho (2nd)",
        second: "Ariane Lee (2nd)",
        third: " 6 others",
      },
      recommendersPhotos: {
        first: "Chelsea",
        second: "Ariane",
        third: "Emily",
      },
      businessImgs: [
        { id: 1, pic: "mech1" },
        { id: 2, pic: "mech2" },
        { id: 3, pic: "mech3" },
        { id: 4, pic: "mech4" },
      ],
      businessName: "Mr. Cool Mechanic",
      address: "259 West Peacock Rd, Mountain View, CA",
    },
    {
      recommendersText: {
        first: "Emily Deng (1st)",
        second: "Tobey MacIntosh (2nd)",
        third: " 3 others",
      },
      recommendersPhotos: {
        first: "Emily",
        second: "Tobey",
        third: "Jenna",
      },
      businessImgs: [
        { id: 1, pic: "mech5" },
        { id: 2, pic: "mech6" },
        { id: 3, pic: "mech7" },
        { id: 4, pic: "mech8" },
      ],
      businessName: "Ms. Great Mechanic",
      address: "585 Cowell Lane, Stanford, CA",
    },
    {
      recommendersText: {
        first: "Ella Brown (2nd)",
        second: "Michael Weinstein (2nd)",
        third: " 2 others",
      },
      recommendersPhotos: {
        first: "StockPerson1",
        second: "StockPerson2",
        third: "StockPerson3",
      },
      businessImgs: [
        { id: 1, pic: "mech9" },
        { id: 2, pic: "mech10" },
        { id: 3, pic: "mech11" },
        { id: 4, pic: "mech12" },
      ],
      businessName: "Mr. Awesome Mechanic",
      address: "585 Cowell Lane, Stanford, CA",
    },
  ];
  return (
    <View style={styles.allReviews}>
      {data.map((item) => (
        <View>
          <BusinessResult data={item} id={item.businessName} />
          <FullLine />
        </View>
      ))}
    </View>
  );
};

export default function searchResultsPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <AllResults />
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
  result: {
    flexDirection: "col",
    paddingVertical: 24,
    gap: 16,
  },
  imageScrollContainer: {
    height: 100,
    overflow: "visible",
  },
  scroll: {
    display: "flex",
    paddingHorizontal: padding.med,
    gap: padding.sm,
    height: "auto",
    width: windowWidth,
  },
  scrollImage: {
    width: 100,
    aspectRatio: 1,
  },
  rowContainerXs: {
    flexDirection: "row",
    gap: padding.xs,
    alignItems: "center",
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
    width: "100%",
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
  },
  colContainerSm: {
    flexDirection: "col",
    gap: padding.sm,
    width: "100%",
  },
  colContainerXs: {
    flexDirection: "col",
    gap: padding.xs,
    width: "100%",
  },
  colContainerMed: {
    flexDirection: "col",
    gap: padding.med,
    width: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: padding.med,
    paddingHorizontal: padding.med,
  },
});
