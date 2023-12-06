import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { FullLine } from "../general/Line";
import {
  TextMedPrimary,
  TextSmSecondary,
  TextMedPrimaryBold,
} from "../general/Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../styles/colors";
import { padding } from "../../styles/spacing";
import { iconSize } from "../../styles/base";

const ModalHeader = ({ onClose }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: padding.med,
      }}
    >
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="close" size={iconSize} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <TextMedPrimaryBold text={"Who can see this?"} />
      </View>
      <Ionicons name="close" size={iconSize} color={"white"} />
    </View>
  );
};

export const PrivacyModal = ({ visible, onClose, publicSetter }) => (
  <Modal
    animationType="none"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ModalHeader onClose={onClose} />
        <FullLine />

        <View style={{ width: "100%", paddingHorizontal: padding.med }}>
          <TouchableOpacity
            onPress={() => {
              publicSetter(true), onClose();
            }}
          >
            <View style={styles.privacyBar}>
              <Ionicons name="earth" size={iconSize} color={colors.grapevine} />
              <View>
                <TextMedPrimary text={"Public"} />
                <TextSmSecondary
                  text={"Visible to your 1st, 2nd, & 3rd degree friends"}
                />
              </View>
            </View>
          </TouchableOpacity>
          <FullLine />
          <TouchableOpacity
            onPress={() => {
              publicSetter(false), onClose();
            }}
          >
            <View style={styles.privacyBar}>
              <Ionicons
                name="people"
                size={iconSize}
                color={colors.grapevine}
              />
              <View>
                <TextMedPrimary text={"Friends"} />
                <TextSmSecondary
                  text={"Visible to your 1st degree friends only."}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    paddingBottom: 40,
    borderRadius: 20,
    backgroundColor: "white",
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
  privacyBar: {
    flexDirection: "row",
    width: "100%",
    gap: padding.med,
    alignItems: "center",
    paddingVertical: padding.med,
  },
});
