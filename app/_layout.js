import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "../utils/AuthProvider";
import { useFonts, LobsterTwo_400Regular } from "@expo-google-fonts/dev";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { colors } from "../styles/colors";
import { padding } from "../styles/spacing";
import { iconSize } from "../styles/base";
import { TextMedInvertedBold } from "../components/general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Makes sure the user is authenticated before accessing protected pages

const toastConfig = {
  success: ({ props }) => (
    <View style={[styles.notification, { backgroundColor: colors.green }]}>
      <Ionicons name="checkmark" size={iconSize} color={colors.textInverted} />
      <TextMedInvertedBold text={props.text} />
    </View>
  ),
  failed: ({ props }) => (
    <View style={[styles.notification, { backgroundColor: colors.red }]}>
      <Ionicons
        name="alert-circle"
        size={iconSize}
        color={colors.textInverted}
      />
      <TextMedInvertedBold text={props.text} />
    </View>
  ),
};

const InitialLayout = () => {
  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
  });

  const { session, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (auth) group
    const inAuthGroup = segments[0] === "(auth)";

    if (session && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace("/(home)");
    } else if (!session) {
      // Redirect unauthenticated users to the login page
      router.replace("/");
    }
  }, [session, initialized]);

  return <Slot />;
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  notification: {
    width: windowWidth - padding.med * 2,
    flexDirection: "row",
    paddingVertical: padding.sm,
    paddingHorizontal: padding.med,
    borderRadius: padding.sm,
    alignItems: "center",
    gap: padding.sm,
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
