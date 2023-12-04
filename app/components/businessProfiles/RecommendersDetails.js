import { View, StyleSheet, Text } from "react-native";
import { OverlappingProfiles } from "../general/Profiles";
import { padding } from "../../../styles/spacing";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

export const RecommendersDetails = ({ people, num_recs }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfile = async (id) => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", id);
      if (error) {
        console.error("Error fetching data:", error);
        return null;
      }
      return data;
    };

    const getAllProfiles = async () => {
      try {
        // Map over 'people' to get an array of promises
        const promises = people.map((id) => getProfile(id));
        // Use Promise.all to wait for all promises to resolve
        const results = await Promise.all(promises);
        setProfiles(results);
      } catch (error) {
        console.error("Error in fetching profiles:", error);
      }
    };

    getAllProfiles();
  }, [people]);

  console.log(profiles);

  return (
    <View style={styles.rowContainerSm}>
      <OverlappingProfiles people={profiles} />
      <View style={styles.rowContainerXsWrap}>
        <Text style={{ fontSize: 12, lineHeight: 16 }}>
          Recommended by
          {profiles.map((item) => {
            return <Text> {item[0].first_name}</Text>;
          })}
          {/* <Text style={{ fontWeight: "700" }}> {first}</Text>,
          <Text style={{ fontWeight: "700" }}> {second}</Text>, and
          <Text style={{ fontWeight: "700" }}>{third} </Text> */}
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
