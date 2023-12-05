import { Text, View, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RecPage() {
  const { business_id, category, business_name } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>Rec Page</Text>
        <Text>{business_name}</Text>
        <Text>{category}</Text>
      </View>
    </SafeAreaView>
  );
}
