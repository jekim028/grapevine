import { View } from "react-native";
import { TextMedSecondary } from "../general/Text";
import { AnonymousToggleButton } from "../general/Button";
export const AnonymousSetter = () => {
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
      <AnonymousToggleButton />
    </View>
  );
};
