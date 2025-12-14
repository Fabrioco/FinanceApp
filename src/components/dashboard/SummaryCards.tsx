import { Text, View } from "react-native";

type Props = {
  income: number;
  expense: number;
};

export function SummaryCards({ income, expense }: Props) {
  return (
    <View className="flex-row gap-4 mb-4">
      <View className="flex-1 bg-white rounded-2xl p-4">
        <Text className="text-sm text-gray-500">Entradas</Text>
        <Text className="text-green-600 font-semibold mt-1">
          R$ {income.toFixed(2)}
        </Text>
      </View>

      <View className="flex-1 bg-white rounded-2xl p-4">
        <Text className="text-sm text-gray-500">Saídas</Text>
        <Text className="text-red-600 font-semibold mt-1">
          R$ {expense.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
