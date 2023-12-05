import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, fonts } from "../../styles/base";
import { businesses, bizdata } from "../../lib/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize, padding } from "../../styles/base";
import { router } from "expo-router";
import { TextSmPrimary, TextXsSecondary } from "../general/Text";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const SearchResult = ({ business }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(p)/businessProfilePage",
          params: { business_id: business.id },
        })
      }
      style={styles.resultCell}
    >
      <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
      <View>
        <TextSmPrimary text={business.name} />
        <TextXsSecondary text={business.address} />
      </View>
    </TouchableOpacity>
  );
};

const SearchFilter = ({ searchQuery }) => {
  const [data, setData] = useState([]);

  const getBusinesses = async () => {
    const { data, error } = await supabase.from("businesses").select("*");
    setData(data);
  };

  getBusinesses();

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (
            searchQuery &&
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return <SearchResult business={item} />;
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
