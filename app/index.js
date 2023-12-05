import {
  Alert,
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { supabase } from "../utils/supabase";
import Grape from "../assets/imgs/Grape.jpg";
import {
  TextMedInverted,
  TextMedAccent,
  TextSmPrimaryBold,
  TextSmSecondaryBold,
  TextSmSecondary,
  TextSmPrimary,
  TextMedPrimary,
  TextMedSecondary,
} from "./components/general/Text";
import { padding } from "../styles/spacing";
import { colors } from "../styles/colors";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={{ width: "100%", alignItems: "center", gap: padding.lg }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: padding.sm,
          }}
        >
          <Image
            source={require("../assets/imgs/Grape.jpg")}
            style={{ width: 64, height: 66 }}
          />
          <Text
            style={{
              fontFamily: "LobsterTwo_400Regular",
              fontSize: 60,

              // lineHeight: 36,
            }}
          >
            Grapevine
          </Text>
        </View>
        <View style={{ width: "100%", gap: padding.sm }}>
          <View style={{ gap: padding.xxs }}>
            <TextSmSecondary text={"Email"} />
            <TextInput
              autoCapitalize="none"
              placeholder="john@doe.com"
              value={email}
              onChangeText={setEmail}
              style={styles.inputField}
            />
          </View>
          <View style={{ gap: padding.xxs }}>
            <TextSmSecondary text={"Password"} />
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center", gap: padding.med }}>
          {email != "" && password != "" && (
            <TouchableOpacity onPress={onSignInPress} style={styles.button}>
              <TextMedInverted text={"Sign In"} />
            </TouchableOpacity>
          )}
          {(email == "" || password == "") && (
            <TouchableOpacity style={styles.disabledButton}>
              <TextMedInverted text={"Sign In"} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onSignUpPress}>
            <TextMedAccent text={"Create New Account"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    alignItems: "center",
    // backgroundColor: "#151515",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 50,
    color: "#fff",
  },
  inputField: {
    marginVertical: 4,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: padding.sm,
    padding: 10,
    color: "black",
    backgroundColor: "white",
  },
  button: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grapevine,
    borderRadius: padding.sm,
    justifyContent: "center",
  },
  disabledButton: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.grapevine,
    opacity: 0.5,
    borderRadius: padding.sm,
    justifyContent: "center",
  },
});

export default Login;
