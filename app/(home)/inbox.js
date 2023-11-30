import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Inbox Page</Text>
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
