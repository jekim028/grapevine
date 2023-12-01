import { feedData } from "../lib/feed-data";
import { FlatList, View, Text } from "react-native";

const FeedPost = ({ item }) => {
  const { user, business, message } = item;
  return (
    <View>
      <Text>{user}</Text>
      <Text>{message}</Text>
      <View>
        <Text>{business}</Text>
      </View>
    </View>
  );
};

const Feed = () => {
  return (
    <View>
      <FlatList
        data={feedData}
        renderItem={({ item }) => {
          return <FeedPost item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Feed;
