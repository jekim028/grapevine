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
import { TextMedPrimaryBold } from "../../components/general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageItem from "../../../components/ImageItem";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState([]);
  const [files, setFiles] = useState([]);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: "Profile" }} />
      <View style={{ padding: 16 }}>
        <ScrollView>
          {files.map((item, index) => (
            <ImageItem
              key={item.id}
              item={item}
              userId={user.id}
              onRemoveImage={() => onRemoveImage(item, index)}
            />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={onSelectImage} style={styles.fab}>
          <Ionicons name="camera-outline" size={30} color={"#000"} />
        </TouchableOpacity>
        <TextMedPrimaryBold
          text={profile.first_name + " " + profile.last_name}
        />
        <TouchableOpacity onPress={signOut} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
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
});
