import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export function OnBoardingStepThree() {
  return (
    <View className="gap-4">
      <Text className="text-xl font-bold text-gray-900">
        Planeje melhor sua vida financeira
      </Text>

      <Text className="text-sm text-gray-500">
        Controle gastos fixos, veja projeções e receba insights inteligentes.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/dashboard")}
        className="bg-blue-600 rounded-xl h-12 justify-center items-center mt-6"
      >
        <Text className="text-white font-semibold">Começar agora</Text>
      </TouchableOpacity>
    </View>
  );
}
