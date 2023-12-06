import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, iconSize, padding } from "../../styles/base";
import { TextMedPrimaryBold } from "../../components/general/Text";
import { AccentButton } from "../../components/general/Button";
import { router } from "expo-router";
import { TabIconWithBadge } from "../../components/general/TabIconWithBadge";
import { useRequest } from "../../utils/RequestProvider";
export default function HomeLayout() {
  const [isModalVisible, setModalVisible] = useState(false);

  const PlusButtons = () => {
    return (
      <View style={styles.rowContainerMed}>
        <TouchableOpacity
          style={{ flex: 1, height: 44 }}
          onPress={() =>
            router.push({ pathname: "/(p)/leaveRecSearch", params: {} })
          }
        >
          <AccentButton text={"Create"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, height: 44 }}
          onPress={() =>
            router.push({ pathname: "/(p)/requestRecSearch", params: {} })
          }
        >
          <AccentButton text={"Request"} />
        </TouchableOpacity>
      </View>
    );
  };

  const PlusModal = ({ visible, onClose }) => (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={iconSize}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <TextMedPrimaryBold text={"Create or Request a"} />
              <TextMedPrimaryBold text={"Recommendation"} />
            </View>
            <Ionicons name="close" size={iconSize} color={"white"} />
          </View>
          <PlusButtons />
        </View>
      </View>
    </Modal>
  );

  // const { friendRequests } = useRequest();

  // const totalNotifs = friendRequests.length; // + Unseen Completed Requests?? Not sure how to add this
  const totalNotifs = 0;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.grapevine,
          tabBarInactiveTintColor: colors.textInverted,
          tabBarStyle: {
            backgroundColor: colors.textPrimary,
            paddingVertical: padding.med,
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
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Display the modal
              setModalVisible(true);
            },
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: ({ size, color }) => (
              <TabIconWithBadge
                iconName={"archive"}
                badgeCount={totalNotifs}
                size={size}
                color={color}
              />
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
      <PlusModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%", // Set modal width to 80% of the screen width
    paddingTop: padding.med,
    paddingBottom: 40,
    paddingHorizontal: padding.med,
    gap: padding.med,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
  },
});
