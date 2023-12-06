import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextMedSecondary, TextMedAccentBold } from "../general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import { iconSize } from "../../styles/base";

export const PrivacySetter = ({ setter, isPublic }) => {
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
        onPress={() => setter(true)}
      >
        {isPublic && (
          <>
            <Ionicons name="earth" size={iconSize} color={colors.grapevine} />
            <TextMedAccentBold text={"Public"} />
          </>
        )}
        {!isPublic && (
          <>
            <Ionicons name="people" size={iconSize} color={colors.grapevine} />
            <TextMedAccentBold text={"Friends"} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    paddingBottom: 40,
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
});
