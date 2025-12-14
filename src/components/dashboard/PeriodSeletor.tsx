import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
  period: string;
  onPrev: () => void;
  onNext: () => void;
};

export function PeriodSelector({ period, onPrev, onNext }: Props) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <TouchableOpacity onPress={onPrev}>
        <FontAwesome5 name="chevron-left" />
      </TouchableOpacity>

      <Text className="font-medium">{period}</Text>

      <TouchableOpacity onPress={onNext}>
        <FontAwesome5 name="chevron-right" />
      </TouchableOpacity>
    </View>
  );
}
