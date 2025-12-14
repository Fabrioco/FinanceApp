import { ReactNode } from "react";
import { View } from "react-native";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">{children}</View>
  );
}
