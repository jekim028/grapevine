import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// Image item component that displays the image from Supabase Storage and a delte button
const ImageItem = ({ item, userId, onRemoveImage }) => {
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
          };
        }
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    };

    downloadImage();
  }, [userId, item.name]);

  return (
    <View style={styles.container}>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#1A1A1A" }]} />
      )}
      {/* Delete image button */}
      <TouchableOpacity onPress={onRemoveImage}>
        <Ionicons name="trash-outline" size={20} color={"#000"} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
