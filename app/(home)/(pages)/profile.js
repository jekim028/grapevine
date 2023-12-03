import { Stack } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "../../../utils/AuthProvider";
import { supabase } from "../../../utils/supabase";
import { TextMedPrimaryBold } from "../../components/general/Text";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState([]);

  // Get profile info
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      setProfile(response.data[0]);
    };
    fetchProfile();
  }, []);

  console.log(profile);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: "Settings" }} />
      <View style={{ padding: 16 }}>
        <TextMedPrimaryBold
          text={profile.first_name + " " + profile.last_name}
        />
        <TouchableOpacity onPress={signOut} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#000968",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  textInput: {
    borderColor: "#000968",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    margin: 8,
  },
});
