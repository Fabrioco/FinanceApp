import { Text, View } from "react-native";

type Props = {
  balance: string;
};

export function BalanceCard({ balance }: Props) {
  return (
    <View className="bg-white rounded-2xl p-6 mb-4">
      <Text className="text-gray-500">Saldo atual</Text>
      <Text className="text-3xl font-bold mt-2">R$ {balance}</Text>
    </View>
  );
}
