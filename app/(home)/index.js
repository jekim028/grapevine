import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import {
  iconSize,
  colors,
  padding,
  borderRadius,
  fonts,
} from "../../styles/base";
import SearchFilter from "../../components/SearchFilter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const CategoryIconBox = ({ iconName, category }) => {
  return (
    <View style={styles.categoryBox}>
      <FontAwesome5
        name={iconName}
        size={iconSize}
        color={colors.textPrimary}
      />
      {/* <Ionicons name={iconName} size={iconSize} color={colors.textPrimary} /> */}
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
        <CategoryIconBox iconName="baby" category="Childcare" />
        <CategoryIconBox iconName="cut" category="Barber" />
        <CategoryIconBox iconName="tooth" category="Dentist" />
      </View>
    </View>
  );
};

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        {/* Search Bar*/}
        <TouchableOpacity
          onPress={() => router.push("/(p)/search")}
          style={styles.searchBox}
        >
          <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
          <Text style={styles.placeholderText}>Search</Text>
        </TouchableOpacity>

        <CategorySection />

        {/* Activity */}
        <Text style={styles.header}>Activity</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  page: {
    flex: 1,
    paddingHorizontal: padding.lg,
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
  placeholderText: {
    flex: 1,
    fontSize: fonts.reg,
    color: colors.placeholder,
  },
  categorySection: {
    paddingVertical: padding.lg,
  },
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
