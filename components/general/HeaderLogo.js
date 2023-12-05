import { View, Image } from "react-native";
import { Title2Primary } from "./Text";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";

export const HeaderLogo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: padding.sm,
      }}
    >
      <Image
        source={require("../../../assets/imgs/Grape.jpg")}
        style={{ width: 32, height: 33 }}
      />
      <Title2Primary text={"Grapevine"} />
    </View>
  );
};
