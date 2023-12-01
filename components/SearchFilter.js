import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors, fonts } from "../styles/base";
import { businesses } from "../lib/data";

const SearchResult = ({ business, address }) => {
  return (
    <View>
      <Text style={styles.businessName}>{business}</Text>
      <Text>{address}</Text>
    </View>
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
});
