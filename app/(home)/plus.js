import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="(pages)/businessProfilePage">
        <Text> To Business Profile Page</Text>
      </Link>
      {/* <Text>Plus Page</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
