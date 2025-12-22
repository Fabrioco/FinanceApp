import { Slot } from "expo-router";
import "@/src/styles/global.css";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}
