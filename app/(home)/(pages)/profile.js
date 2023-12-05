import { Stack } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthProvider";
import { supabase } from "../../../utils/supabase";
import {
  TextMedPrimaryBold,
  TextMedPrimary,
  TextMedSecondary,
  TextMedSecondaryBold,
  TextSmSecondaryBold,
} from "../../../components/general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageItem from "../../../components/general/ImageItem";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { padding } from "../../../styles/spacing";
import { iconSize } from "../../../styles/base";
import { colors } from "../../../styles/colors";
import {
  TextLgPrimary,
  TextLgPrimaryBold,
} from "../../../components/general/Text";
import { router } from "expo-router";
export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState([]);
  const [files, setFiles] = useState([]);
  const [hasImage, setHasImage] = useState(false);

  // Get profile info
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      setProfile(response.data[0]);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!user) return;
    // Load user images
    loadImages();
  }, [user]);

  const loadImages = async () => {
    const { data } = await supabase.storage.from("avatars").list(user.id);
    if (data) {
      setFiles(data);
    }
  };

  const getUrl = async ({ filePath }) => {
    const { data } = await supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;
    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);
  };

  const onSelectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const { data } = await supabase.storage.from("avatars").list(user.id);

      const filePath = `${user.id}/profile.${
        img.type === "image" ? "png" : "mp4"
      }`;

      const contentType = img.type === "image" ? "image/png" : "video/mp4";
      if (data && data.length > 0) {
        supabase.storage.from("avatars").remove([`${user.id}/${data[0].name}`]);
      }
      await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64), { contentType });

      getUrl({ filePath });
      loadImages();
    }
  };

  const onRemoveImage = async (item, listIndex) => {
    await supabase.storage.from("avatars").remove([`${user.id}/${item.name}`]);
    const newFiles = [...files];
    newFiles.splice(listIndex, 1);
    setFiles(newFiles);
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
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={iconSize}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <TextLgPrimary text={"Profile"} />
        <Ionicons name="close" size={iconSize} color={"white"} />
      </View>
    );
  };

  const Bar = ({ iconName, title }) => {
    return (
      <View>
        {title === "Logout" ? (
          <TouchableOpacity onPress={signOut} style={styles.bar}>
            <Ionicons name={iconName} size={iconSize} color={"black"} />
            <TextMedPrimary text={title} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bar}>
            <Ionicons name={iconName} size={iconSize} color={"black"} />
            <TextMedPrimary text={title} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const SettingsSection = ({ title, sectionBarData }) => {
    return (
      <View
        style={{
          gap: 1,
          backgroundColor: colors.gray,
          width: "100%",
        }}
      >
        <View style={styles.sectionTitle}>
          <TextSmSecondaryBold text={title} />
        </View>
        {sectionBarData.map((item) => (
          <Bar iconName={item.iconName} title={item.title} />
        ))}
        <View></View>
      </View>
    );
  };

  const settingsSectionData = [
    {
      title: "Account",
      sectionBarData: [
        {
          title: "Privacy",
          iconName: "lock-closed-outline",
        },
        {
          title: "Security",
          iconName: "shield-outline",
        },
        {
          title: "Your Recommendations",
          iconName: "star-outline",
        },
        {
          title: "Logout",
          iconName: "log-out-outline",
        },
      ],
    },
    {
      title: "Content & Display",
      sectionBarData: [
        {
          title: "Notifications",
          iconName: "notifications-outline",
        },
        {
          title: "Language",
          iconName: "language-outline",
        },
        {
          title: "Dark Mode",
          iconName: "moon-outline",
        },
      ],
    },
    {
      title: "Support & About",
      sectionBarData: [
        {
          title: "Report a Problem",
          iconName: "flag-outline",
        },
        {
          title: "Terms & Policies",
          iconName: "information-circle-outline",
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <ScrollView
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ width: "100%", paddingHorizontal: padding.med }}>
            <Header />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: padding.med,
                width: "100%",
              }}
            >
              {files.map((item, index) => (
                <ImageItem
                  key={item.id}
                  item={item}
                  userId={user.id}
                  onRemoveImage={() => onRemoveImage(item, index)}
                  hasImageSetter={setHasImage}
                />
              ))}
              {!hasImage && (
                <View style={{ alignItems: "center", gap: -28 }}>
                  <View style={styles.empty}>
                    <Ionicons
                      name="image-outline"
                      size={48}
                      color={"#B0B0B0"}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={onSelectImage}
                    style={{
                      backgroundColor: colors.grapevine,
                      padding: padding.xs,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                      borderWidth: 2,
                      borderColor: "white",
                      marginLeft: 60,
                    }}
                  >
                    <Ionicons
                      name="cloud-upload-outline"
                      size={16}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <TextLgPrimaryBold
                text={profile.first_name + " " + profile.last_name}
              />
            </View>
          </View>

          <View style={{ gap: padding.lg, width: "100%" }}>
            {settingsSectionData.map((item) => (
              <SettingsSection
                title={item.title}
                sectionBarData={item.sectionBarData}
                key={item.title}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#000968",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  textInput: {
    borderColor: "#000968",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    margin: 8,
  },
  empty: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    gap: padding.med,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "white",
    paddingHorizontal: padding.med,
  },
  sectionTitle: {
    flexDirection: "row",
    gap: padding.med,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: padding.med,
    paddingBottom: 10,
    paddingTop: 24,
  },
});
