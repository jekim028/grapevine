import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Touchable,
  View,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  iconSize,
  colors,
  borderRadius,
  padding,
  fonts,
} from "../../styles/base";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSubmit = () => {
    router.push({
      pathname: "../../app/(home)/(pages)/searchResultsPage.js",
      params: { searchQuery },
    });
  };

  return (
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
        onSubmitEditing={() => handleSubmit()}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
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
  search: {
    flex: 1,
    fontSize: fonts.reg,
  },
});
