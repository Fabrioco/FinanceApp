import { Text, TouchableOpacity, View } from "react-native";
import { MostUsedCategory } from "../dashboard/MostUsedCategory";
import { CategoryChartPlaceholder } from "../dashboard/CategoryChartPlaceholder";

export function OnBoardingStepTwo({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <View className="gap-4">
      <Text className="text-xl font-bold text-gray-900">
        Entenda para onde seu dinheiro vai
      </Text>

      <MostUsedCategory data={["Alimentação", 1200]} />
      <CategoryChartPlaceholder />

      <Text className="text-sm text-gray-500">
        Descubra quais categorias mais consomem seu dinheiro.
      </Text>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          onPress={onBack}
          className="h-12 w-[45%] border border-blue-600 rounded-xl justify-center items-center"
        >
          <Text className="text-blue-600 font-semibold">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          className="h-12 w-[45%] bg-blue-600 rounded-xl justify-center items-center"
        >
          <Text className="text-white font-semibold">Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
