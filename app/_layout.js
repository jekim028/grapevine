import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../utils/AuthProvider";
import { useFonts, LobsterTwo_400Regular } from "@expo-google-fonts/dev";
import toast, { Toaster } from "react-hot-toast/src/core/use-toaster";

// Makes sure the user is authenticated before accessing protected pages
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
    <AuthProvider>
      <InitialLayout>
        <Toaster />
      </InitialLayout>
    </AuthProvider>
  );
};

export default RootLayout;
