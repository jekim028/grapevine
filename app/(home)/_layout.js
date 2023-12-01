import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, iconSize, padding } from "../../styles/base";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.grapevine,
        tabBarInactiveTintColor: colors.textInverted,
        tabBarStyle: {
          backgroundColor: colors.textPrimary,
          paddingVertical: padding.sm,
        },
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          tabBarLabel: "Plus",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="archive" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(pages)"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
