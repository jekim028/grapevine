import { View, StyleSheet, Text } from "react-native";
import { OverlappingProfiles } from "../general/Profiles";
import { padding } from "../../../styles/spacing";

export const RecommendersDetails = ({
  person1,
  person2,
  person3,
  first,
  second,
  third,
}) => {
  return (
    <View style={styles.rowContainerSm}>
      <OverlappingProfiles
        person1={person1}
        person2={person2}
        person3={person3}
      />
      <View style={styles.rowContainerXsWrap}>
        <Text style={{ fontSize: 12, lineHeight: 16 }}>
          Recommended by
          <Text style={{ fontWeight: "700" }}> {first}</Text>,
          <Text style={{ fontWeight: "700" }}> {second}</Text>, and
          <Text style={{ fontWeight: "700" }}>{third} </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
    width: "100%",
  },
  rowContainerXsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: padding.xs,
    alignItems: "center",
    flexShrink: 1,
  },
});
