import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import {
  TextLgPrimary,
  TextSmPrimaryBold,
  TextSmSecondary,
  TextMedSecondary,
  TextMedAccentBold,
  TextMedPrimaryBold,
  TextMedInvertedBold,
  TextMedInverted,
  TextMedPrimary,
} from "../components/general/Text";
import { FullLine, PaddedLine } from "../components/general/Line";
import { iconSize } from "../../styles/base";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/core";
import { useAuth } from "../../utils/AuthProvider";
import { supabase } from "../../utils/supabase";

export default function Page() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isRequestFilled, setIsRequestFilled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState(null);
  const { user, signOut } = useAuth();

  const ToggleButton = () => {
    const handleToggle = () => {
      setIsAnonymous(!isAnonymous);
    };

    return (
      <View style={styles.toggleButton}>
        <TouchableOpacity
          style={isAnonymous ? styles.buttonOn : styles.buttonOff}
          onPress={handleToggle}
        >
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    );
  };

  const ModalHeader = ({ onClose }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: padding.med,
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <TextMedPrimaryBold text={"Who can see this?"} />
        </View>
        <Ionicons name="close" size={24} color={"white"} />
      </View>
    );
  };

  const PrivacySetter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextMedSecondary text={"Privacy"} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: padding.sm,
          }}
          onPress={() => setModalVisible(true)}
        >
          {isPublic && (
            <>
              <Ionicons name="earth" size={iconSize} color={colors.grapevine} />
              <TextMedAccentBold text={"Public"} />
            </>
          )}
          {!isPublic && (
            <>
              <Ionicons
                name="people"
                size={iconSize}
                color={colors.grapevine}
              />
              <TextMedAccentBold text={"Friends"} />
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const AnonymousSetter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextMedSecondary text={"Post Anonymously"} />
        <ToggleButton />
      </View>
    );
  };

  const PrivacyModal = ({ visible, onClose }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ModalHeader onClose={onClose} />
          <FullLine />

          <View style={{ width: "100%", paddingHorizontal: padding.med }}>
            <TouchableOpacity
              onPress={() => {
                setIsPublic(true), onClose();
              }}
            >
              <View style={styles.privacyBar}>
                <Ionicons
                  name="earth"
                  size={iconSize}
                  color={colors.grapevine}
                />
                <View>
                  <TextMedPrimary text={"Public"} />
                  <TextSmSecondary
                    text={"Visible to your 1st, 2nd, & 3rd degree friends"}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <FullLine />
            <TouchableOpacity
              onPress={() => {
                setIsPublic(false), onClose();
              }}
            >
              <View style={styles.privacyBar}>
                <Ionicons
                  name="people"
                  size={iconSize}
                  color={colors.grapevine}
                />
                <View>
                  <TextMedPrimary text={"Friends"} />
                  <TextSmSecondary
                    text={"Visible to your 1st degree friends only."}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingVertical: padding.med,
        }}
      >
        <TouchableOpacity onPress={() => clearSelectedCategory()}>
          <Ionicons name="close" size={iconSize} color={colors.textPrimary} />
        </TouchableOpacity>
        <TextLgPrimary text={"Request a Recommendation"} />
        <Ionicons name="close" size={iconSize} color={"white"} />
      </View>
    );
  };

  const clearSelectedCategory = async () => {
    try {
      await AsyncStorage.removeItem("@selectedCategory");
      router.back();
    } catch (e) {
      console.log("Error removing category from async storage:", e);
    }
  };

  const CategorySearch = () => {
    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        const getSelectedCategory = async () => {
          try {
            const category = await AsyncStorage.getItem("@selectedCategory");
            if (category !== null) {
              setSelectedCategory(category);
            }
          } catch (e) {
            console.log("Error reading category value:", e);
          }
        };

        getSelectedCategory();
      }
    }, [isFocused]);

    return (
      <View style={{ gap: padding.xs, paddingVertical: padding.med }}>
        <TextSmPrimaryBold text={"Category"} />
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="search"
              size={iconSize}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="E.g. Doctor, Nanny, Mechanic, etc."
            clearButtonMode="never"
            value={selectedCategory ? selectedCategory : ""}
            style={styles.search}
          />
          <Ionicons
            name="chevron-down"
            size={iconSize}
            color={colors.textPrimary}
          />
        </View>
      </View>
    );
  };

  const RequestPrompt = () => {
    return (
      <View style={{ gap: padding.xs, paddingVertical: padding.med }}>
        <TextSmSecondary
          text={
            "A few things to consider in your request: service, price, location, etc. "
          }
        />
      </View>
    );
  };

  const handleSubmit = async () => {
    console.log(user.id);
    const { data, error } = await supabase
      .from("requests")
      .insert({
        user_id: user.id,
        message: message,
        category: selectedCategory,
        isAnonymous: isAnonymous,
        isPublic: isPublic,
      })
      .select();

    console.log("data:", data);
    console.log("error:", error);

    router.replace("/(home)/inbox");
  };

  const BottomPinned = () => {
    return (
      <View style={{ gap: padding.med, paddingVertical: padding.lg }}>
        <AnonymousSetter />
        <PrivacySetter />
        {(!selectedCategory || !isRequestFilled) && (
          <View style={styles.greyedButton}>
            <TextMedInverted text={"Send"} />
          </View>
        )}
        {selectedCategory && isRequestFilled && (
          <TouchableOpacity onPress={handleSubmit} style={styles.accentButton}>
            <TextMedInverted text={"Send"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleMessageChange = (text) => {
    setMessage(text);
    if (text) {
      setIsRequestFilled(true);
    } else {
      setIsRequestFilled(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          style={{ paddingHorizontal: padding.med }}
          contentContainerStyle={{
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <View>
            <Header />
            <TouchableOpacity onPress={() => router.push("/(p)/categories")}>
              <CategorySearch />
            </TouchableOpacity>
            <RequestPrompt />
            <TextInput
              placeholder="Include the details of your request here "
              clearButtonMode="always"
              style={styles.search}
              value={message}
              onChangeText={(text) => handleMessageChange(text)}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <BottomPinned />
        </ScrollView>
      </View>
      <PrivacyModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchBox: {
    display: "flex",
    padding: padding.sm,
    flexDirection: "row",
    borderRadius: padding.sm,
    alignItems: "center",
    backgroundColor: colors.formBackground,
    width: "100%",
    gap: padding.sm,
  },
  search: {
    flex: 1,
  },
  search: {
    flex: 1,
    fontSize: padding.med,
  },
  accentButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: colors.grapevine,
  },
  greyedButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    opacity: 0.5,
    backgroundColor: colors.grapevine,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%", // Set modal width to 80% of the screen width
    paddingBottom: 40,
    // gap: padding.med,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  privacyBar: {
    flexDirection: "row",
    width: "100%",
    gap: padding.med,
    alignItems: "center",
    paddingVertical: padding.med,
  },
  toggleButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOn: {
    width: 56, // Width of the toggle
    height: 30,
    paddingHorizontal: 4,
    backgroundColor: colors.grapevine,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonOff: {
    width: 56, // Width of the toggle
    height: 30,
    paddingHorizontal: 4,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "start",
  },
  dot: {
    height: 20, // Height of the dot
    width: 20, // Width of the dot
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
