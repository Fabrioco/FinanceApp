// src/components/dashboard/ProjectionCard.tsx
import { View, Text } from "react-native";
import { Transaction } from "@/src/types/transaction";

type Props = {
  transactions: Transaction[];
};

export function ProjectionCard({ transactions }: Props) {
  const fixedIncome = transactions
    .filter((t) => t.type === "INCOME" && t.isFixed)
    .reduce((acc, t) => acc + t.value, 0);

  const fixedExpense = transactions
    .filter((t) => t.type === "EXPENSE" && t.isFixed)
    .reduce((acc, t) => acc + t.value, 0);

  const projection = fixedIncome - fixedExpense;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4">
      <Text className="text-gray-500 text-sm mb-1">Projeção mensal</Text>
      <Text className="font-semibold text-lg">R$ {projection.toFixed(2)}</Text>
    </View>
  );
}
