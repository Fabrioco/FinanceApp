import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-gray-100"
    >
      <View className="flex-1 px-6">{children}</View>
    </SafeAreaView>
  );
}
