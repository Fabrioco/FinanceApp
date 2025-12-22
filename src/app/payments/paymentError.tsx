import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { router } from "expo-router";

export default function PaymentErrorScreen() {
  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-6">
          <Feather name="x" size={40} color="#DC2626" />
        </View>

        <Text className="text-2xl font-semibold mb-2">
          Pagamento não concluído
        </Text>

        <Text className="text-gray-500 text-center mb-8">
          Nenhuma cobrança foi realizada. Tente novamente.
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity
            className="h-12 px-6 bg-gray-200 rounded-xl items-center justify-center"
            onPress={() => router.back()}
          >
            <Text className="text-gray-700 font-medium">Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="h-12 px-6 bg-blue-600 rounded-xl items-center justify-center"
            onPress={() => router.replace("/payments/paymentMethods")}
          >
            <Text className="text-white font-medium">Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
