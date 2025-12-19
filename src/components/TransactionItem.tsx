import { View, Text } from "react-native";
import { Transaction } from "@/src/types/transaction";

export function TransactionItem({ item }: { item: Transaction }) {
  return (
    <View className="bg-white p-4 rounded-xl mb-2">
      <Text className="font-medium">{item.title}</Text>

      <Text
        className={item.type === "INCOME" ? "text-blue-600" : "text-red-600"}
      >
        R$ {item.value.toFixed(2)}
      </Text>

      <Text className="text-xs text-gray-400">
        {item.isInstallment &&
          `${item.installmentIndex}/${item.installmentTotal}`}
        {item.originId && " • Fixa"}
      </Text>
    </View>
  );
}
