import { View } from "react-native";
import { TextMedSecondary } from "../general/Text";
import { AnonymousToggleButton } from "../general/Button";

export const AnonymousSetter = ({ text, setter, isAnonymous }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextMedSecondary text={`${text} Anonymously`} />
      <AnonymousToggleButton setter={setter} isAnonymous={isAnonymous} />
    </View>
  );
};
