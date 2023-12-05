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
import {
  TextLgPrimary,
  TextMedPrimaryBold,
  TextSmPrimaryBold,
} from "../../components/general/Text";
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
    <>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          backgroundColor: "white",
          paddingHorizontal: padding.med,
        }}
        onPress={handleSelect}
      >
        <TextMedPrimaryBold text={category.category} />
      </TouchableOpacity>
    </>
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
    <View
      style={{
        paddingTop: padding.sm,
      }}
    >
      {data.map((item) => {
        if (
          !searchQuery ||
          (searchQuery &&
            item.category.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return <Category category={item} key={item.id} />;
        }
      })}
    </View>
  );
};

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
      <TextLgPrimary text={"Select a Business Category"} />
      <Ionicons name="close" size={iconSize} color={"white"} />
    </View>
  );
};

const TopPinned = () => {
  return (
    <View style={{ paddingHorizontal: padding.med }}>
      <Header />
      <View style={styles.searchBox}>
        <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
        <TextInput
          placeholder="E.g. Doctor, Nanny, Mechanic, etc."
          clearButtonMode="always"
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          style={styles.search}
        />
      </View>
    </View>
  );
};

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ width: "100%" }}>
        <View style={{ paddingHorizontal: padding.med }}>
          <Header />
          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={iconSize}
              color={colors.textPrimary}
            />
            <TextInput
              placeholder="E.g. Doctor, Nanny, Mechanic, etc."
              clearButtonMode="always"
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
              style={styles.search}
            />
          </View>
        </View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <CategoryFilter searchQuery={searchQuery} />
        </ScrollView>
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
