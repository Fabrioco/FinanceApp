import { View, Text } from "react-native";

type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  isFixed: boolean;
};

type Props = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: Props) {
  return (
    <View className="bg-white rounded-xl p-4 mb-3">
      <View className="flex-row justify-between">
        <Text className="font-semibold">{transaction.title}</Text>
        <Text
          className={
            transaction.type === "INCOME"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {transaction.type === "INCOME" ? "+" : "-"} R${" "}
          {transaction.value.toFixed(2)}
        </Text>
      </View>

      <View className="flex-row justify-between mt-1">
        <Text className="text-gray-500 text-sm">{transaction.category}</Text>
        {transaction.isFixed && (
          <Text className="text-blue-500 text-xs font-semibold">FIXO</Text>
        )}
      </View>
    </View>
  );
}
