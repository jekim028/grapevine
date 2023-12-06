import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Touchable,
  Image,
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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { supabase } from "../../utils/supabase";
import { decode } from "base64-arraybuffer";
import { ImageItem } from "../../components/general/ImageItems";
import { useAuth } from "../../utils/AuthProvider";

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

export default function RecPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const [message, setMessage] = useState(null);
  const [imgArray, setImgArray] = useState([]);
  const [urlArray, setUrlArray] = useState(null);

  const { business_id, category, business_name, notifMessage } =
    useLocalSearchParams();
  const { user } = useAuth();

  const handleMessageChange = (text) => {
    setMessage(text);
    if (text) {
      setIsRequestFilled(true);
    } else {
      setIsRequestFilled(false);
    }
  };

  const getImgUrl = async ({ filePath }) => {
    const { data, error } = await supabase.storage
      .from("rec-photos")
      .getPublicUrl(filePath);

    if (error) {
      // Handle the error appropriately
      console.error("Error fetching public URL:", error);
      return;
    }

    const publicUrl = data.publicUrl;

    // Use the setUrlArray function to update the state
    setUrlArray((prevUrlArray) => [...prevUrlArray, publicUrl]);
  };

  const uploadImagesToSupabase = async () => {
    for (const localUri of imgArray) {
      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: "base64",
      });

      const filePath = `${business_id}/${new Date().getTime()}.png`;
      const contentType = "image/png";

      await supabase.storage
        .from("rec-photos")
        .upload(filePath, decode(base64), { contentType });

      getImgUrl({ filePath });
    }
  };

  const handleSubmit = async () => {
    uploadImagesToSupabase();
    const { error } = await supabase.from("recs").insert({
      user_id: user.id,
      message: message,
      photos: urlArray,
      business_id: business_id,
      isPublic: isPublic,
    });
    if (error) {
      console.error("Error inserting rec:", error);
    }

    router.replace("/(home)");

    // showSuccessToast("Here");
    showSuccessToast(notifMessage);
  };

  const onRemoveImage = (index) => {
    // Remove the image URI at the given index
    const updatedImages = imgArray.filter((_, i) => i !== index);
    setImgArray(updatedImages);
  };

  onSelectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const localImages = result.assets.map((img) => img.uri);
      setImgArray((prevImages) => [...prevImages, ...localImages]);
    }
  };

  const BottomPinned = () => {
    return (
      <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
        <TouchableOpacity onPress={onSelectImage}>
          <Text>Camera Button</Text>
        </TouchableOpacity>
        {imgArray && (
          <View>
            {imgArray.map((img, index) => (
              <ImageItem img={img} onRemoveImage={() => onRemoveImage(index)} />
            ))}
          </View>
        )}
        <AnonymousSetter />
        <PrivacySetter setter={setModalVisible} isPublic={isPublic} />
        {!isRequestFilled && (
          <View style={styles.greyedButton}>
            <TextMedInverted text={"Send"} />
          </View>
        )}
        {isRequestFilled && (
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.accentButton}
          >
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
