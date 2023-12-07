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
import Toast from "react-native-toast-message";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}

export default function addNewBusinessProfilePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const { user } = useAuth();

  const handleMessageChange = ({ text, setter }) => {
    setter(text);
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
        <TouchableOpacity onPress={() => clearSelectedCategory()}>
          <Ionicons
            name="chevron-back"
            size={iconSize}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <TextLgPrimary text={"New Business Profile"} />
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

  const NameInputField = () => {
    return (
      <View style={{ gap: padding.xs }}>
        <TextSmPrimaryBold text={"Business Name"} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="E.g. Elite Mechanics or John Doe"
            clearButtonMode="never"
            value={businessName}
            style={styles.search}
            onChangeText={(text) =>
              handleMessageChange({ text, setter: setBusinessName })
            }
          />
        </View>
      </View>
    );
  };

  const NumberInputField = () => {
    return (
      <View style={{ gap: padding.xs }}>
        <TextSmPrimaryBold text={"Phone Number"} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="123456789"
            clearButtonMode="never"
            value={businessNumber}
            style={styles.search}
            onChangeText={(text) =>
              handleMessageChange({ text, setter: setBusinessNumber })
            }
          />
        </View>
      </View>
    );
  };

  const WebsiteInputField = () => {
    return (
      <View style={{ gap: padding.xs }}>
        <TextSmPrimaryBold text={"Website"} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="www.elitemechanics.com"
            clearButtonMode="never"
            value={businessWebsite}
            style={styles.search}
            onChangeText={(text) =>
              handleMessageChange({ text, setter: setBusinessWebsite })
            }
          />
        </View>
      </View>
    );
  };

  const AddressInputField = () => {
    return (
      <View style={{ gap: padding.xs }}>
        <TextSmPrimaryBold text={"Address"} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder="123 Stanford Ave, Palo Alto, CA 94305"
            clearButtonMode="never"
            value={businessAddress}
            style={styles.search}
            onChangeText={(text) =>
              handleMessageChange({ text, setter: setBusinessAddress })
            }
          />
        </View>
      </View>
    );
  };

  const handleSubmit = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "100%" }}>
        <ScrollView
          style={{ paddingHorizontal: padding.med, height: "100%" }}
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
            <View style={{ gap: padding.med }}>
              <NameInputField />
              <NumberInputField />
              <WebsiteInputField />
              <AddressInputField />
            </View>
          </View>
          <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
            {(businessName == "" ||
              (businessNumber == "" && businessWebsite == "") ||
              selectedCategory == null) && (
              <View style={styles.greyedButton}>
                <TextMedInverted text={"Next"} />
              </View>
            )}
            {businessName != "" &&
              selectedCategory != null &&
              (businessNumber != "" || businessWebsite != "") && (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(p)/leaveRecPage",
                      params: {
                        // does the business need an ID?
                        business_id: null,
                        category: selectedCategory,
                        business_name: businessName,
                        notifMessage: "Profile created & recommendation posted",
                        fromFriendRequests: false,
                        friendRequestId: null,
                      },
                    })
                  }
                  style={styles.accentButton}
                >
                  <TextMedInverted text={"Next"} />
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: windowHeight,
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
  inputBox: {
    display: "flex",
    padding: padding.sm,
    height: iconSize + padding.med,
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
