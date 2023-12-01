import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors, fonts } from "../styles/base";

const businesses = [
  {
    business: "Mr. Cool Mechanic",
    address: "459 Avenue of the Americas",
  },
  {
    business: "Ms. Great Mechanic",
    address: "680 Lomita Drive",
  },
  {
    business: "My Mother",
    address: "500 West Adams Blvd",
  },
];

const SearchResult = ({ business, address }) => {
  console.log(business, address);
  // const { business, address } = item;
  return (
    <View>
      <Text style={styles.businessName}>{business}</Text>
      <Text>{address}</Text>
    </View>
  );
};

const renderSearchResult = ({ item }) => {
  console.log(item);
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
