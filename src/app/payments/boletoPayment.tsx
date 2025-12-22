import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { router } from "expo-router";

export default function BoletoPaymentScreen() {
  return (
    <Container>
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-2xl font-semibold mb-2">
            Pagamento via boleto
          </Text>
          <Text className="text-gray-500 mb-6">
            O pagamento pode levar até 2 dias úteis para ser confirmado
          </Text>

          <View className="bg-white rounded-xl p-6 items-center">
            <Feather name="file-text" size={48} color="#6B7280" />
            <Text className="text-gray-700 mt-4 text-center">
              Gere o boleto e realize o pagamento pelo seu banco
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="h-14 bg-gray-800 rounded-xl items-center justify-center mb-6"
          onPress={() => router.replace("/payments/paymentSuccess")}
        >
          <Text className="text-white font-semibold">Gerar boleto</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
