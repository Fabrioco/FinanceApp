// src/components/dashboard/InsightsCard.tsx
import { View, Text } from "react-native";
import { Transaction } from "@/src/types/transaction";

type Props = {
  transactions: Transaction[];
};

export function InsightsCard({ transactions }: Props) {
  const expenses = transactions.filter((t) => t.type === "EXPENSE");

  if (expenses.length < 2) return null;

  const total = expenses.reduce((acc, t) => acc + t.value, 0);
  const avg = total / expenses.length;

  const biggest = expenses.sort((a, b) => b.value - a.value)[0];

  return (
    <View className="bg-white rounded-2xl p-4 mb-6">
      <Text className="text-gray-500 text-sm mb-2">Insights</Text>
      <Text className="text-sm">
        💸 Maior gasto: <Text className="font-semibold">{biggest.title}</Text>
      </Text>
      <Text className="text-sm mt-1">
        📊 Média de despesas: R$ {avg.toFixed(2)}
      </Text>
    </View>
  );
}
