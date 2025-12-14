import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onIncome: () => void;
  onExpense: () => void;
};

export default function ActionsModal({ onIncome, onExpense }: Props) {
  return (
    <View className="flex-row gap-4 mb-6">
      <TouchableOpacity
        className="flex-1 bg-blue-600 h-14 rounded-xl items-center justify-center"
        onPress={onIncome}
      >
        <Text className="text-white font-semibold">+ Receita</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 bg-red-600 h-14 rounded-xl items-center justify-center"
        onPress={onExpense}
      >
        <Text className="text-white font-semibold">- Despesa</Text>
      </TouchableOpacity>
    </View>
  );
}
