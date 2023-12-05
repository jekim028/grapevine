import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { TextLgPrimary, TextSmPrimaryBold } from "../components/general/Text";
import { iconSize, padding, colors } from "../../styles/base";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Category = ({ category }) => {
  const handleSelect = async () => {
    try {
      await AsyncStorage.setItem("@selectedCategory", category.category);
      router.back();
    } catch (e) {
      console.log("Error storing category with Async Storage:", e);
    }
  };

  return (
    <TouchableOpacity onPress={handleSelect}>
      <Text>{category.category}</Text>
    </TouchableOpacity>
  );
};

const CategoryFilter = ({ searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      setData(data);
    };

    getCategories();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (
            !searchQuery ||
            (searchQuery &&
              item.category.toLowerCase().includes(searchQuery.toLowerCase()))
          ) {
            return <Category category={item} />;
          }
        }}
        keyExtracter={(item) => item.id}
      />
    </View>
  );
};

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingHorizontal: padding.med }]}
    >
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={iconSize}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="E.g. Doctor, Nanny, Mechanic, etc."
          clearButtonMode="always"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          style={styles.search}
        />
      </View>

      <CategoryFilter searchQuery={searchQuery} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
