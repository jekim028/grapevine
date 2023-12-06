import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Text,
  ScrollView,
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
import SearchFilter from "../../components/search/SearchFilter";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  TextSmPrimary,
  TextSmSecondary,
  TextLgPrimary,
} from "../../components/general/Text";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: padding.med,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="close" size={iconSize} color={colors.textPrimary} />
      </TouchableOpacity>
      <TextLgPrimary text={"Create a Recommendation"} />
      <Ionicons name="close" size={iconSize} color={"white"} />
    </View>
  );
};

export default function leaveRecSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: padding.med,
          alignItems: "center",
        }}
      >
        <Header />
        <View style={{ gap: padding.xxs }}>
          {/* Search Bar*/}
          <TextSmSecondary text={"Business Name"} />
          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={iconSize}
              color={colors.textPrimary}
            />
            <TextInput
              placeholder="Search for a business to recommend"
              clearButtonMode="always"
              value={searchQuery}
              style={styles.search}
              onChangeText={(query) => handleSearch(query)}
              onSubmitEditing={() => {}}
            />
          </View>

          {/* Search Results */}
          <SearchFilter searchQuery={searchQuery} isRegSearch={false} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    flex: 1,
    paddingHorizontal: padding.lg,
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
    fontSize: padding.med,
  },
});
