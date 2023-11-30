import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";

// const ImageScroll = () => {
//   return (

//   )
// }
export default function businessProfilePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.headerBar}>
          <View style={styles.headerButton}></View>
          <View style={styles.headerButton}></View>
        </View>
        <ScrollView horizontal={true} contentContainerStyle={styles.gallery}>
          <Image source={require("../../../assets/imgs/mech.png")} />
          <Image source={require("../../../assets/imgs/mech.png")} />
          <Image source={require("../../../assets/imgs/mech.png")} />
        </ScrollView>
        <Text>Business Profile Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    
  }, 
  gallery: {
    display: "flex",
    // flexDirection: "col",
    gap: 16,
    height: 10,
    overflow: "visible",
  },
  headerBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 100000000,
    backgroundColor: "#D9D9D9",
  },
});
