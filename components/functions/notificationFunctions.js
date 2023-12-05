import Toast from "react-native-toast-message";

export function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}
