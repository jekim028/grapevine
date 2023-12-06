import { View, Image, TouchableOpacity } from "react-native";
import { TextMedSecondary } from "../general/Text";
import { AnonymousToggleButton } from "../general/Button";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import Ionicons from "@expo/vector-icons/Ionicons";
import { iconSize } from "../../styles/base";
export const AddPhotoButton = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingVertical: padding.sm,
        borderRadius: padding.sm,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.textSecondary,
      }}
    >
      <Image source={require("../../assets/imgs/plusPhoto.jpg")} />
    </TouchableOpacity>
  );
};
