import { Text, TouchableOpacity, View } from "react-native";
import { BalanceCard } from "../dashboard/BalanceCard";
import { SummaryCards } from "../dashboard/SummaryCards";

export function OnBoardingStepOne({ onNext }: { onNext: () => void }) {
  return (
    <View className="gap-4">
      <Text className="text-xl font-bold text-gray-900">
        Tenha controle total da sua vida financeira
      </Text>

      <BalanceCard balance="5000" />
      <SummaryCards expense={3000} income={5000} />

      <Text className="text-sm text-gray-500">
        Veja seu saldo, entradas e gastos do mês em um só lugar.
      </Text>

      <TouchableOpacity
        onPress={onNext}
        className="bg-blue-600 rounded-xl h-12 justify-center items-center mt-4"
      >
        <Text className="text-white font-semibold">Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
