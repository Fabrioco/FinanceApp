// src/components/dashboard/FixedExpensesCard.tsx
import { View, Text } from "react-native";
import { Transaction } from "@/src/types/transaction";

type Props = {
  transactions: Transaction[];
};

export function FixedExpensesCard({ transactions }: Props) {
  const total = transactions
    .filter((t) => t.type === "EXPENSE" && t.isFixed)
    .reduce((acc, t) => acc + t.value, 0);

  if (total === 0) return null;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4">
      <Text className="text-gray-500 text-sm mb-1">Despesas fixas</Text>
      <Text className="text-red-600 font-semibold text-lg">
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}
