import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";

import { useFonts, LobsterTwo_400Regular } from "@expo-google-fonts/dev";

export default function IndexPage() {
  let [fontsLoaded] = useFonts({
    LobsterTwo_400Regular,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(home)/");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(home)/");
      } else {
        console.log("no user");
        router.replace("/(auth)/login");
      }
    });
  }, []);
}
