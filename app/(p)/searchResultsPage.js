import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Title3PrimaryBold } from "../components/general/Text";
import { AccentButton, InvertedButton } from "../components/general/Button";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import { ImageScroll } from "../components/general/ImageScroll";
import { BusinessActionLine } from "../components/businessProfiles/BusinessActionLine";
import { RecommendersDetails } from "../components/businessProfiles/RecommendersDetails";
import { FullLine } from "../components/general/Line";
import { iconSize, borderRadius, fonts } from "../../styles/base";
import { bizdata } from "../../lib/data";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ActionButtons = ({ actions }) => {
  return (
    <View style={styles.rowContainerMed}>
      {actions.map((item) => (
        <InvertedButton text={item.title} key={item.id} />
      ))}
    </View>
  );
};
const BusinessDetails = ({
  businessName,
  address,
  recommenders,
  photos,
  actions,
}) => {
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
        <ActionButtons actions={actions} />
      </View>
    </View>
  );
};

const BusinessResult = ({ data }) => {
  const {
    recommendersText,
    recommendersPhotos,
    businessImgs,
    hasPics,
    businessName,
    address,
    actions,
  } = data;
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/(p)/businessProfilePage", params: {} })
      }
      style={styles.result}
    >
      {hasPics && <ImageScroll height={100} images={businessImgs} />}
      <BusinessDetails
        businessName={businessName}
        address={address}
        recommenders={recommendersText}
        photos={recommendersPhotos}
        actions={actions}
      />
    </TouchableOpacity>
  );
};

const AllResults = ({ searchQuery }) => {
  return (
    <View style={styles.allReviews}>
      {bizdata.map((item) => {
        if (
          searchQuery &&
          item.businessName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return (
            <View key={item.businessName}>
              <BusinessResult data={item} id={item.businessName} />
              <FullLine />
              <FullLine />
              <FullLine />
            </View>
          );
        }
      })}
    </View>
  );
};

export default function searchResultsPage() {
  const { query } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          {/* Search Bar*/}
          <View style={{ paddingHorizontal: padding.med }}>
            <TouchableOpacity
              onPress={() => router.push("/(p)/search")}
              style={styles.searchBox}
            >
              <Ionicons
                name="chevron-back"
                size={iconSize}
                color={colors.textPrimary}
              />
              <Text style={styles.searchQuery}>{query}</Text>
            </TouchableOpacity>
          </View>
          <AllResults searchQuery={query} />
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
  searchBox: {
    display: "flex",
    padding: padding.sm,
    flexDirection: "row",
    borderRadius: borderRadius.pill,
    alignItems: "center",
    backgroundColor: colors.formBackground,
    width: "100%",
    gap: padding.sm,
  },
  search: {
    flex: 1,
    fontSize: fonts.reg,
  },
  searchQuery: {
    flex: 1,
    fontSize: fonts.reg,
    color: colors.textPrimary,
  },
});
