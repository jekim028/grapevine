import { View, ScrollView, Image, StyleSheet } from "react-native";
import { padding } from "../../styles/spacing";
import { Dimensions } from "react-native";
import * as MechPics from "../../assets/imgs/mechanics";
const windowWidth = Dimensions.get("window").width;

export const ImageScroll = ({ images, height }) => {
  const styles = StyleSheet.create({
    imageScrollContainer: {
      height: height,
      overflow: "visible",
    },
    scroll: {
      display: "flex",
      paddingHorizontal: padding.med,
      gap: padding.sm,
      height: "auto",
      width: windowWidth,
    },
    scrollImage: {
      width: height,
      aspectRatio: 1,
      borderRadius: 8,
    },
  });
  return (
    <View style={styles.imageScrollContainer}>
      <ScrollView
        horizontal={true}
        showsHoriztonalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {images.map((item) => (
          <Image
            source={{ uri: item }}
            style={styles.scrollImage}
            key={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};
