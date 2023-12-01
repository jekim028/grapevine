import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, fonts } from "../styles/base";
import { businesses, bizdata } from "../lib/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize, padding } from "../styles/base";
import { router } from "expo-router";
import { TextSmPrimary, TextXsSecondary } from "../app/components/general/Text";

const SearchResult = ({ business, address }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(p)/businessProfilePage",
          params: { business },
        })
      }
      style={styles.resultCell}
    >
      <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
      <View>
        <TextSmPrimary text={business} />
        <TextXsSecondary text={address} />
      </View>
    </TouchableOpacity>
  );
};

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
  return (
    <View>
      <FlatList
        data={bizdata}
        renderItem={({ item }) => {
          if (
            searchQuery &&
            item.businessName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return (
              <SearchResult
                business={item.businessName}
                address={item.address}
              />
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.searchResults}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  businessName: {
    color: colors.textPrimary,
    fontSize: fonts.med,
  },
  resultCell: {
    flexDirection: "row",
    padding: padding.sm,
    gap: padding.sm,
    alignItems: "center",
  },
  searchResults: {
    paddingVertical: padding.med,
  },
});
