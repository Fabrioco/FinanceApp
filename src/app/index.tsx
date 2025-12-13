import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-between bg-[#F1F5F9] py-[100px]
      "
    >
      <View className="flex flex-col items-center justify-center gap-4">
        <Text className="text-4xl font-bold text-center">
          Bem vindo ao FinanceApp
        </Text>
        <Text className="text-sm text-gray-500 mb-10">
          Controle seus gastos de forma simples e inteligente
        </Text>
        <FontAwesome5 name="coins" size={102} color="#a1a1a1" />
      </View>

      <View className="w-10/12">
        <TouchableOpacity
          className="bg-white rounded-md p-4 border border-gray-100 w-full flex flex-row items-center justify-between"
          onPress={() => router.push("/auth/login")}
        >
          <Text className="text-xl font-semibold uppercase">Começar</Text>
          <FontAwesome5 name="angle-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
