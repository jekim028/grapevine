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
      return data[0];
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

  return (
    <View style={styles.rowContainerSm}>
      <OverlappingProfiles people={profiles} />
      <View style={styles.rowContainerXsWrap}>
        <Text style={{ fontSize: 12, lineHeight: 16 }}>
          Recommended by
          {profiles.length === 1 && (
            <Text style={{ fontWeight: "700" }}> {profiles[0].first_name}</Text>
          )}
          {profiles.length === 2 && (
            <>
              <Text style={{ fontWeight: "700" }}>
                {" "}
                {profiles[0].first_name}
              </Text>
              <Text> and</Text>
              <Text style={{ fontWeight: "700" }}>
                {" "}
                {profiles[1].first_name}
              </Text>
            </>
          )}
          {profiles.length > 2 && (
            <>
              {profiles.slice(0, -1).map((item, index) => (
                <Text key={item.id} style={{ fontWeight: "700" }}>
                  {index > 0 ? ", " : " "}
                  {item.first_name}
                </Text>
              ))}
              <Text>, and</Text>
              <Text style={{ fontWeight: "700" }}>
                {" "}
                {profiles[profiles.length - 1].first_name}
              </Text>
            </>
          )}
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
