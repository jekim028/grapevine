import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import {
  TextLgPrimary,
  TextSmPrimaryBold,
  TextSmSecondary,
  TextMedInverted,
} from "../../components/general/Text";
import { iconSize } from "../../styles/base";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/core";
import { useAuth } from "../../utils/AuthProvider";
import { supabase } from "../../utils/supabase";
import { AnonymousSetter } from "../../components/creating/AnonymousSetter";
import { PrivacySetter } from "../../components/creating/PrivacySetter";
import { PrivacyModal } from "../../components/creating/PrivacyModal";
import Toast from "react-native-toast-message";

function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}

export default function Page() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

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
        <TouchableOpacity onPress={() => clearSelectedCategory()}>
          <Ionicons name="close" size={iconSize} color={colors.textPrimary} />
        </TouchableOpacity>
        <TextLgPrimary text={"Request a Recommendation"} />
        <Ionicons name="close" size={iconSize} color={"white"} />
      </View>
    );
  };

  const clearSelectedCategory = async () => {
    try {
      await AsyncStorage.removeItem("@selectedCategory");
      router.back();
    } catch (e) {
      console.log("Error removing category from async storage:", e);
    }
  };

  const CategorySearch = () => {
    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        const getSelectedCategory = async () => {
          try {
            const category = await AsyncStorage.getItem("@selectedCategory");
            if (category !== null) {
              setSelectedCategory(category);
            }
          } catch (e) {
            console.log("Error reading category value:", e);
          }
        };

        getSelectedCategory();
      }
    }, [isFocused]);

    return (
      <View style={{ gap: padding.xs, paddingVertical: padding.med }}>
        <TextSmPrimaryBold text={"Category"} />
        <View style={styles.searchBox}>
          <Ionicons name="search" size={iconSize} color={colors.textPrimary} />
          <TextInput
            placeholder="E.g. Doctor, Nanny, Mechanic, etc."
            clearButtonMode="never"
            value={selectedCategory ? selectedCategory : ""}
            style={styles.search}
          />
        </View>
      </View>
    );
  };

  const RequestPrompt = () => {
    return (
      <View style={{ gap: padding.xs, paddingVertical: padding.med }}>
        <TextSmSecondary
          text={
            "A few things to consider in your request: service, price, location, etc. "
          }
        />
      </View>
    );
  };

  const handleSubmit = async () => {
    console.log(user.id);
    const { data, error } = await supabase
      .from("requests")
      .insert({
        user_id: user.id,
        message: message,
        category: selectedCategory,
        isAnonymous: isAnonymous,
        isPublic: isPublic,
      })
      .select();

    console.log("data:", data);
    console.log("error:", error);

    router.replace("/(home)/inbox");
    showSuccessToast("Request sent");
  };

  const BottomPinned = () => {
    return (
      <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
        <AnonymousSetter text={"Send"} setter={setIsAnonymous} isAnonymous={isAnonymous} />
        <PrivacySetter setter={setModalVisible} isPublic={isPublic} />
        {(!selectedCategory || !isRequestFilled) && (
          <View style={styles.greyedButton}>
            <TextMedInverted text={"Send"} />
          </View>
        )}
        {selectedCategory && isRequestFilled && (
          <TouchableOpacity onPress={handleSubmit} style={styles.accentButton}>
            <TextMedInverted text={"Send"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleMessageChange = (text) => {
    setMessage(text);
    if (text) {
      setIsRequestFilled(true);
    } else {
      setIsRequestFilled(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          style={{ paddingHorizontal: padding.med }}
          contentContainerStyle={{
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <View>
            <Header />
            <TouchableOpacity onPress={() => router.push("/(p)/categories")}>
              <CategorySearch />
            </TouchableOpacity>
            <RequestPrompt />
            <TextInput
              placeholder="Include the details of your request here "
              clearButtonMode="always"
              style={styles.search}
              value={message}
              onChangeText={(text) => handleMessageChange(text)}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <BottomPinned />
        </ScrollView>
      </View>
      <PrivacyModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        publicSetter={setIsPublic}
      />
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
  accentButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: colors.grapevine,
  },
  greyedButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    opacity: 0.5,
    backgroundColor: colors.grapevine,
  },
});
