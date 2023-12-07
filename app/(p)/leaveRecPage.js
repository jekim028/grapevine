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
import { useState, useEffect } from "react";
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
import { useRequest } from "../../utils/RequestProvider";

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
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const [message, setMessage] = useState(null);
  const [imgArray, setImgArray] = useState([]);
  const [urlArray, setUrlArray] = useState([]);

  const {
    business_id,
    category,
    business_name,
    notifMessage,
    fromFriendRequests,
    friendRequestId,
  } = useLocalSearchParams();
  const { user } = useAuth();

  const handleMessageChange = (text) => {
    setMessage(text);
    if (text) {
      setIsRequestFilled(true);
    } else {
      setIsRequestFilled(false);
    }
  };

  const getImgUrl = async (filePath) => {
    const { data, error } = await supabase.storage
      .from("rec-photos")
      .getPublicUrl(filePath);
    if (error) {
      // Handle the error appropriately
      console.error("Error fetching public URL:", error);
      return;
    }

    return data.publicUrl;
  };

  const uploadImagesToSupabase = async () => {
    const urlPromises = []; // Store promises here

    try {
      for (const localUri of imgArray) {
        const base64 = await FileSystem.readAsStringAsync(localUri, {
          encoding: "base64",
        });

        const filePath = `${business_id}/${new Date().getTime()}.png`;
        const contentType = "image/png";

        await supabase.storage
          .from("rec-photos")
          .upload(filePath, decode(base64), { contentType });

        urlPromises.push(getImgUrl(filePath));
      }

      const urls = await Promise.all(urlPromises);
      return urls;
    } catch (error) {
      console.error("Error uploading images:", error);
    }
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

  const AddImageScroll = ({ images, height }) => {
    const styles = StyleSheet.create({
      imageScrollContainer: {
        height: height,
        overflow: "visible",
      },
      scroll: {
        display: "flex",
        gap: padding.sm,
        height: "auto",
        overflow: "visible",
      },
      squareCameraButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: height,
        aspectRatio: 1,
        paddingVertical: padding.sm,
        borderRadius: padding.sm,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.textSecondary,
      },
    });

    return (
      <View style={styles.imageScrollContainer}>
        <ScrollView
          horizontal={true}
          showsHoriztonalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <TouchableOpacity
            style={styles.squareCameraButton}
            onPress={onSelectImage}
          >
            <Image source={require("../../assets/imgs/plusPhoto.jpg")} />
          </TouchableOpacity>
          {images.map((img, index) => (
            <ImageItem
              img={img}
              onRemoveImage={() => onRemoveImage(index)}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const BottomPinned = () => {
    return (
      <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
        <View style={{ overflow: "visible" }}>
          {imgArray.length == 0 && (
            <TouchableOpacity
              style={styles.horizontalCameraButton}
              onPress={onSelectImage}
            >
              <Image source={require("../../assets/imgs/plusPhoto.jpg")} />
            </TouchableOpacity>
          )}
          {imgArray.length > 0 && (
            <AddImageScroll height={100} images={imgArray} />
          )}
        </View>

        <AnonymousSetter
          text={"Post"}
          setter={setIsAnonymous}
          isAnonymous={isAnonymous}
        />
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

  const { friendRequests, setFriendRequests } = useRequest();

  const removeItem = (id) => {
    const numId = parseInt(id);

    const filteredItems = friendRequests.filter((item) => item.id !== numId);

    setFriendRequests(filteredItems);
    // console.log("FILTERED", filteredItems);
  };

  const handleSubmit = async () => {
    let finalUrlArray = [];

    if (imgArray.length > 0) {
      finalUrlArray = await uploadImagesToSupabase();
    }

    const { error } = await supabase.from("recs").insert({
      user_id: user.id,
      message: message,
      photos: finalUrlArray,
      business_id: business_id,
      isPublic: isPublic,
    });

    if (error) {
      console.error("Error inserting rec:", error);
      // Handle error (e.g., show an error message to the user)
    }

    // Add photos to business photo array
    // Fetch current row
    let { data, error: fetchError } = await supabase
      .from("businesses")
      .select("photos")
      .eq("id", business_id);

    if (fetchError) {
      console.error("Error fetching row:", fetchError);
      return;
    }

    const currRow = data[0].photos ? data[0].photos : [];

    // Update the array with new values
    const updatedArray = [...currRow, ...finalUrlArray];

    // Update the row in the database
    const { data: updatedRow, error: updateError } = await supabase
      .from("businesses")
      .update({ photos: finalUrlArray })
      .eq("id", business_id);

    if (updateError) {
      console.error("Error updating row:", updateError);
      return;
    }

    removeItem(friendRequestId);

    // Only navigate if there's no error
    router.replace("/(home)");

    // Optionally, show a success toast
    showSuccessToast(notifMessage);
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
  horizontalCameraButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: padding.sm,
    borderRadius: padding.sm,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.textSecondary,
  },
});
