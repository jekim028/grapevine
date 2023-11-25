import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Pressable, Text } from "react-native";
import { Colors } from "../styles";

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      <Link href="/home" asChild>
        <Pressable style={styles.loginButton}>
          <Text>Login</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: Colors.colors.grapevine,
    padding: 10,
    borderRadius: 8,
  },
});
