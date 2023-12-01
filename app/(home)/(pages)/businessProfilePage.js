import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

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
} from "../../components/text/Text";
import { colors } from "../../../styles/colors";
import { padding } from "../../../styles/spacing";

import ProfilePic from "../../components/ProfilePic";
import Pill from "../../components/Pill";

const BusinessActionLine = ({ iconName, iconSize, iconColor, text }) => {
  return (
    <View style={styles.rowContainerSm}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <TextXsSecondary text={text} />
    </View>
  );
};

const BusinesProfileReview = ({ person, name, degree, reviewText }) => {
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
      <Ionicons name={"chevron-back"} size={24} color={colors.textPrimary} />
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
const BusinessPhotosScroll = () => {
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scroll}>
        <Image source={require("../../../assets/imgs/mech.png")} />
        <Image source={require("../../../assets/imgs/mech.png")} />
        <Image source={require("../../../assets/imgs/mech.png")} />
      </ScrollView>
    </View>
  );
};

const BusinessDetails = () => {
  return (
    <View style={styles.section}>
      <View style={styles.colContainerMed}>
        <View style={styles.colContainerXs}>
          <Title3PrimaryBold text={"Mr. Cool Mechanic"} />
          <View style={styles.rowContainerXs}>
            <TextXsPrimary text={"Recommended by"} />
            <TextXsPrimaryBold text={"Chelsea Cho"} />
          </View>
        </View>
        <View style={styles.colContainerSm}>
          <BusinessActionLine
            iconName={"location"}
            iconSize={16}
            iconColor={colors.grapevine}
            text={"259 West Peacock Rd, Mountain View, CA"}
          />
          <BusinessActionLine
            iconName={"call"}
            iconSize={16}
            iconColor={colors.grapevine}
            text={"201-248-8682"}
          />
          <BusinessActionLine
            iconName={"globe"}
            iconSize={16}
            iconColor={colors.grapevine}
            text={"www.mrcoolmechanic.com"}
          />
        </View>
      </View>
    </View>
  );
};

const ReviewScroll = () => {
  return (
    <View style={{ marginTop: -padding.sm, marginBottom: padding.med }}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scroll}>
        <BusinesProfileReview
          person={"Chelsea"}
          name={"Chelsea Cho"}
          degree={"2nd"}
          reviewText={
            "“He knew exactly what was wrong with my car when it was making a weird sound. Best quote in the area!”"
          }
        />
        <BusinesProfileReview
          person={"Chelsea"}
          name={"Chelsea Cho"}
          degree={"2nd"}
          reviewText={
            "“He knew exactly what was wrong with my car when it was making a weird sound. Best quote in the area!”"
          }
        />
        <BusinesProfileReview
          person={"Chelsea"}
          name={"Chelsea Cho"}
          degree={"2nd"}
          reviewText={
            "“He knew exactly what was wrong with my car when it was making a weird sound. Best quote in the area!”"
          }
        />
      </ScrollView>
    </View>
  );
};

const Line = () => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line} />
    </View>
  );
};

const Map = () => {
  return <Image source={require("../../../assets/imgs/map.jpg")} />;
};

const TotalRecommendations = () => {
  return (
    <View>
      <TextLgBold text={"8 recommendations"} />
      <View style={styles.rowContainerSm}>
        <TextXsPrimary text={"3 second degree friends"} />
        <TextXsPrimary text={"5 second degree friends"} />
      </View>
    </View>
  );
};

const ReviewKeyMentions = () => {
  return (
    <View style={styles.colContainerXs}>
      <TextSmPrimary text={"Review Key Mentions"} />
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
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <BusinessPhotosScroll />
        <BusinessDetails />
        <Line />
        <RecommendationsDetails />
        <ReviewScroll />
        <Map />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: padding.med,
  },
  headerBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: padding.med,
  },
  headerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: 100000000,
  },
  scrollViewContainer: {
    height: 150,
    overflow: "visible",
  },
  scroll: {
    display: "flex",
    paddingHorizontal: padding.med,
    gap: padding.med,
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
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: padding.med,
  },
  line: {
    height: 1,
    backgroundColor: colors.gray,
    width: "100%",
  },
  rowContainerXs: {
    flexDirection: "row",
    gap: padding.xs,
    alignItems: "center",
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
