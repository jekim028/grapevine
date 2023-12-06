import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../../utils/supabase";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";

export const ProfileImageItem = ({
  item,
  userId,
  onRemoveImage,
  hasImageSetter,
}) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const downloadImage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(`${userId}/${item.name}`);

        if (error) {
          throw error;
        }

        if (data) {
          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = () => {
            setImage(fr.result);
            hasImageSetter(true);
          };
        }
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    };

    downloadImage();
  }, [userId, item.name]);

  return (
    <View style={styles.profileContainer}>
      {image && <Image style={styles.profileImage} source={{ uri: image }} />}
      <TouchableOpacity
        onPress={() => {
          onRemoveImage(), hasImageSetter(false);
        }}
        style={{
          backgroundColor: colors.gray,
          padding: padding.xs,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "white",
          marginLeft: 60,
        }}
      >
        <Ionicons name="trash-outline" size={16} color={"#000"} />
      </TouchableOpacity>
    </View>
  );
};

export const ImageItem = ({ img, onRemoveImage }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: img }} />
      <TouchableOpacity
        onPress={() => {
          onRemoveImage();
        }}
        style={{
          backgroundColor: colors.gray,
          padding: padding.xs,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "white",
          borderRadius: 50,
          position: "absolute",
          right: 4,
          bottom: 4,
          overflow: "visible",
        }}
      >
        <Ionicons
          name="trash-outline"
          size={20}
          color={"#000"}
          style={styles.clearButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    gap: -28,
  },
  container: {
    alignItems: "flex-start",
    overflow: "visible",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  empty: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "black",
  },
  clearButton: {
    marginLeft: "auto",
  },
});
