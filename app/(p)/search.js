import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
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
import debounce from "lodash/debounce";

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
          <TouchableOpacity onPress={() => router.replace("/(home)/")}>
            <Ionicons
              name="chevron-back"
              size={iconSize}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for recommendations"
            clearButtonMode="always"
            value={searchQuery}
            style={styles.search}
            onChangeText={(query) => handleSearch(query)}
            onSubmitEditing={(event) => {
              // Extract the query text from the event object
              const query = event.nativeEvent.text;

              // Use router.push directly with the extracted query
              router.push({
                pathname: "../(home)/(pages)/searchResultsPage",
                params: { query },
              });
            }}
          />
        </View>

        {/* Search Results */}
        <SearchFilter
          searchQuery={searchQuery}
          isRegSearch={true}
          hasAddOption={false}
          fromFriendRequests={false}
          friendRequestId={null}
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
});
