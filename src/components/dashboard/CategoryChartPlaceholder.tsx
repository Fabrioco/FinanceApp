// src/components/dashboard/CategoryChartPlaceholder.tsx
import { View, Text } from "react-native";

export function CategoryChartPlaceholder() {
  return (
    <View className="bg-white rounded-2xl p-6 mb-6 items-center">
      <Text className="text-gray-500 mb-2">Gastos por categoria</Text>
      <View className="w-full h-32 bg-gray-100 rounded-xl items-center justify-center">
        <Text className="text-gray-400 text-sm">Gráfico em breve</Text>
      </View>
    </View>
  );
}
