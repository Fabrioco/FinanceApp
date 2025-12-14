import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function Header() {
  return (
    <View className="mt-10 mb-6 flex-row justify-between items-center">
      <View>
        <Text className="text-gray-500">Olá,</Text>
        <Text className="text-2xl font-semibold">Fabricio 👋</Text>
      </View>
      <TouchableOpacity className="bg-white rounded-full p-3">
        <FontAwesome5 name="bell" size={16} />
      </TouchableOpacity>
    </View>
  );
}
