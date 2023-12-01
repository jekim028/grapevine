import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, fonts } from "../styles/base";
import { businesses } from "../lib/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize, padding } from "../styles/base";
import { router } from "expo-router";

const SearchResult = ({ business, address }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/(home)", params: { business } })}
      style={styles.resultCell}
    >
      <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
      <View>
        <Text style={styles.businessName}>{business}</Text>
        <Text>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
  return (
    <View>
      <FlatList
        data={businesses}
        renderItem={({ item }) => {
          if (
            searchQuery &&
            item.business.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return (
              <SearchResult business={item.business} address={item.address} />
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
