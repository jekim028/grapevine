import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, fonts } from "../../styles/base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize, padding } from "../../styles/base";
import { router } from "expo-router";
import { TextSmPrimary, TextXsSecondary } from "../general/Text";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../utils/supabase";
import { useRequest } from "../../utils/RequestProvider";

import debounce from "lodash/debounce";

const SearchResult = ({ business }) => {
  return (
    <View style={styles.resultCell}>
      <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
      <View>
        <TextSmPrimary text={business.name} />
        {business.address && <TextXsSecondary text={business.address} />}
      </View>
    </View>
  );
};

const AddProfileResult = ({ text }) => {
  return (
    <View style={styles.resultCell}>
      <Ionicons name="add" size={iconSize} color={colors.textPrimary} />
      <View>
        <TextSmPrimary text={text} />
      </View>
    </View>
  );
};

const SearchFilter = ({
  searchQuery,
  isRegSearch,
  hasAddOption,
  fromFriendRequests,
  friendRequestId,
}) => {
  const [data, setData] = useState([]);

  const debouncedFetchData = useCallback(
    debounce(async (query) => {
      const { data, error } = await supabase
        .from("businesses")
        .select("name, type, address, id")
        .ilike("name", `%${query}%`);
      if (error) {
        console.log("Debouncing error:", error);
      }
      setData(data);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchData(searchQuery);
    } else {
      setData([]);
    }
  }, [searchQuery, debouncedFetchData]);

  return (
    <View
      style={{
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (isRegSearch) {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "../(home)/(pages)/businessProfilePage",
                    params: { business_id: item.id },
                  })
                }
              >
                <SearchResult business={item} />
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(p)/leaveRecPage",
                    params: {
                      business_id: item.id,
                      category: item.type,
                      business_name: item.name,
                      notifMessage: "Recommendation posted",
                      fromFriendRequests: fromFriendRequests,
                      friendRequestId: friendRequestId,
                    },
                  })
                }
              >
                <SearchResult business={item} />
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.searchResults}
        ListFooterComponent={
          searchQuery != "" && (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(p)/addNewBusinessProfilePage",
                })
              }
            >
              <AddProfileResult text={"Add New Business Profile"} />
            </TouchableOpacity>
          )
        }
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
    flexGrow: 0,
  },
});
