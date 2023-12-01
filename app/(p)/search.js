import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
import { router } from "expo-router";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        {/* Search Bar*/}
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={iconSize}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            value={searchQuery}
            style={styles.search}
            onChangeText={(query) => handleSearch(query)}
          />
        </View>

        {/* Search Results */}
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
  search: {
    flex: 1,
    fontSize: fonts.reg,
  },
});