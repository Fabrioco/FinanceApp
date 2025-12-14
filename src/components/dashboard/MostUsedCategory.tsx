import { Text, View } from "react-native";

type Props = {
  data?: [string, number];
};

export function MostUsedCategory({ data }: Props) {
  if (!data) return null;

  return (
    <View className="bg-white rounded-2xl p-4 mb-6">
      <Text className="text-gray-500 text-sm mb-1">
        Categoria mais movimentada
      </Text>

      <View className="flex-row justify-between">
        <Text className="font-semibold">{data[0]}</Text>
        <Text className="text-red-600 font-semibold">
          R$ {data[1].toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
