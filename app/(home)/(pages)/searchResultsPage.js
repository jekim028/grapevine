import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  TextMedPrimaryBold,
  Title3PrimaryBold,
} from "../../../components/general/Text";
import { AccentButton } from "../../../components/general/Button";
import { colors } from "../../../styles/colors";
import { padding } from "../../../styles/spacing";
import { ImageScroll } from "../../../components/general/ImageScroll";
import { BusinessActionLine } from "../../../components/businessProfiles/BusinessActionLine";
import { RecommendersDetails } from "../../../components/businessProfiles/RecommendersDetails";
import { iconSize, fonts } from "../../../styles/base";
import { useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useEffect } from "react";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const ActionButtons = ({ actions }) => {
  return (
    <View style={styles.rowContainerMed}>
      {actions.map((item) => (
        <AccentButton text={item.title} key={item.id} />
      ))}
    </View>
  );
};
const BusinessDetails = ({
  businessName,
  address,
  people,
  num_recs,
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
                size={iconSize}
                color={colors.textPrimary}
              />
            </View>
            {address && (
              <BusinessActionLine
                iconName={"location"}
                iconSize={iconSize}
                iconColor={colors.grapevine}
                text={address}
              />
            )}
          </View>
          <RecommendersDetails people={people} num_recs={num_recs} />
        </View>
        <ActionButtons actions={actions} />
      </View>
    </View>
  );
};

const BusinessResult = ({ data }) => {
  const [recs, setRecs] = useState([]);
  const { address, name, id, num_recs, phone, type, website, photos } = data;

  useEffect(() => {
    const getRecs = async () => {
      const { data, error } = await supabase
        .from("recs")
        .select()
        .eq("business_id", id)
        .limit(3);
      setRecs(data);
    };
    getRecs();
  }, []);

  let people = [];
  recs.map((item) => {
    people.push(item.user_id);
  });

  let actions = [];
  if (phone) {
    actions.push({ id: 1, title: "Call" });
  }
  if (website) {
    actions.push({ id: 2, title: "Website" });
  }

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "../(pages)/businessProfilePage",
          params: { business_id: id },
        })
      }
      style={styles.result}
    >
      {photos && <ImageScroll height={100} images={photos} />}
      <BusinessDetails
        businessName={name}
        address={address}
        people={people}
        num_recs={num_recs}
        actions={actions}
      />
    </TouchableOpacity>
  );
};

const AllResults = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const { data, error } = await supabase
          .from("businesses")
          .select()
          .ilike("search_businesses", `%${searchQuery}%`);

        if (error) {
          throw error;
        }
        setData(data);
      } catch (error) {
        console.error("Error getting businesses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBusinesses();
  }, []);

  let numResults = data.length;

  return (
    <View style={styles.allReviews}>
      {isLoading ? (
        <View
          style={{
            paddingHorizontal: padding.med,
            paddingTop: padding.lg,
          }}
        >
          <TextMedPrimaryBold text={"Loading results..."} />
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingHorizontal: padding.med,
              paddingVertical: padding.lg,
            }}
          >
            <TextMedPrimaryBold
              text={`Showing ${numResults} results for '${searchQuery}'`}
            />
          </View>
          <View style={{ gap: 2, backgroundColor: colors.gray, paddingTop: 2 }}>
            {data.map((item) => {
              return (
                <BusinessResult data={item} id={item.name} key={item.id} />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default function searchResultsPage() {
  const { query } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", justifyContent: "flex-start" }}>
        <ScrollView
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={{ justifyContent: "flex-start" }}
        >
          {/* Search Bar*/}
          <View style={{ paddingHorizontal: padding.med, width: "100%" }}>
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
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  result: {
    flexDirection: "col",
    paddingVertical: 24,
    gap: 16,
    backgroundColor: "white",
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
    borderRadius: padding.sm,
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
