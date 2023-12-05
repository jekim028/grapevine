import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../../utils/supabase";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
// Image item component that displays the image from Supabase Storage and a delte button
const ImageItem = ({ item, userId, onRemoveImage, hasImageSetter }) => {
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
    <View style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
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

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: -28,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  empty: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "black",
  },
});
