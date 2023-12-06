import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize } from "../../styles/base";
import {
  TextLgPrimary,
  TextSmSecondary,
  TextMedSecondary,
  TextMedInverted,
} from "../../components/general/Text";
import { useState } from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { AnonymousSetter } from "../../components/creating/AnonymousSetter";
import { PrivacySetter } from "../../components/creating/PrivacySetter";
import { PrivacyModal } from "../../components/creating/PrivacyModal";

function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}

const Header = ({ businessName, businessCategory }) => {
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
        <Ionicons
          name="chevron-back"
          size={iconSize}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TextLgPrimary text={businessName} />
        <TextSmSecondary text={businessCategory} />
      </View>

      <Ionicons name="close" size={iconSize} color={"white"} />
    </View>
  );
};

const ReviewPrompt = () => {
  return (
    <View style={{ gap: padding.xs, paddingVertical: padding.med }}>
      <TextSmSecondary
        text={
          "A few things to consider in when writing your recommendation: service, price, location, etc. "
        }
      />
    </View>
  );
};

const handleSubmit = async () => {
  // console.log(user.id);
  // const { data, error } = await supabase
  //   .from("requests")
  //   .insert({
  //     user_id: user.id,
  //     message: message,
  //     category: selectedCategory,
  //     isAnonymous: isAnonymous,
  //     isPublic: isPublic,
  //   })
  //   .select();

  // console.log("data:", data);
  // console.log("error:", error);

  router.replace("/(home)");
  showSuccessToast("Recommendation posted");
};

export default function RecPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const { business_id, category, business_name } = useLocalSearchParams();
  const [message, setMessage] = useState(null);

  const handleMessageChange = (text) => {
    setMessage(text);
    if (text) {
      setIsRequestFilled(true);
    } else {
      setIsRequestFilled(false);
    }
  };

  const BottomPinned = () => {
    return (
      <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
        <AnonymousSetter />
        <PrivacySetter setter={setModalVisible} isPublic={isPublic} />
        {!isRequestFilled && (
          <View style={styles.greyedButton}>
            <TextMedInverted text={"Send"} />
          </View>
        )}
        {isRequestFilled && (
          <TouchableOpacity onPress={handleSubmit} style={styles.accentButton}>
            <TextMedInverted text={"Send"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          style={{ paddingHorizontal: padding.med }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <View>
            <Header businessName={business_name} businessCategory={category} />

            <ReviewPrompt />
            <TextInput
              placeholder="Write your recommendation here"
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
  page: {
    flex: 1,
    paddingHorizontal: padding.lg,
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
