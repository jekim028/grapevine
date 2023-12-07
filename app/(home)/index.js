import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  iconSize,
  colors,
  padding,
  borderRadius,
  fonts,
} from "../../styles/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import Feed from "../../components/general/Feed";
import { PaddedLine } from "../../components/general/Line";
import { Title2Primary } from "../../components/general/Text";
import { ProfilePic } from "../../components/general/Profiles";
import { useAuth } from "../../utils/AuthProvider";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useFeed } from "../../utils/FeedProvider";

const CategoryIconBox = ({ iconName, category }) => {
  return (
    <View style={styles.categoryBox}>
      <FontAwesome5
        name={iconName}
        size={iconSize}
        color={colors.textPrimary}
      />
      <Text style={styles.categoryDesc}>{category}</Text>
    </View>
  );
};

const CategorySection = () => {
  return (
    <View style={styles.categorySection}>
      <View style={styles.row}>
        <CategoryIconBox iconName="car" category="Mechanic" />
        <CategoryIconBox iconName="stethoscope" category="Doctor" />
        <CategoryIconBox iconName="pencil-ruler" category="Tutor" />
        <CategoryIconBox iconName="hand-holding-heart" category="Therapist" />
      </View>
      <View style={styles.row}>
        <CategoryIconBox iconName="paw" category="Petsitter" />
        <CategoryIconBox iconName="baby" category="Nanny" />
        <CategoryIconBox iconName="cut" category="Barber" />
        <CategoryIconBox iconName="tooth" category="Dentist" />
      </View>
    </View>
  );
};

export default function Home() {
  const { profile, session } = useAuth();
  const { recs, setRecs } = useFeed();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: padding.med,
              paddingVertical: padding.sm,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: padding.sm,
              }}
            >
              <Image
                source={require("../../assets/imgs/Grape.jpg")}
                style={{ width: 32, height: 33 }}
              />
              <Title2Primary text={"Grapevine"} />
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(pages)/profile")}
              style={{ paddingHorizontal: padding.sm }}
            >
              <Ionicons
                name="person-outline"
                size={iconSize}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar*/}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => router.push("/(p)/search")}
              style={styles.searchBox}
            >
              <Ionicons
                name="search"
                size={iconSize}
                color={colors.textPrimary}
              />
              <Text style={styles.placeholderText}>
                Search for recommendations
              </Text>
            </TouchableOpacity>
            <CategorySection />
          </View>
          <PaddedLine />

          {/* Activity */}
          <Feed recs={recs} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    paddingHorizontal: padding.med,
    paddingVertical: padding.med,
    gap: padding.med,
    backgroundColor: "white",
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
  placeholderText: {
    flex: 1,
    fontSize: fonts.reg,
    color: colors.placeholder,
  },
  categorySection: {},
  categoryBox: {
    display: "flex",
    gap: padding.sm,
    alignItems: "center",
    flex: 1,
  },
  row: {
    marginVertical: padding.sm,
    flexDirection: "row",
  },
  categoryDesc: {
    fontSize: fonts.sm,
  },
  header: {
    fontSize: fonts.t3,
  },
});
