import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Container from "@/src/components/Container";
import { router } from "expo-router";

export default function CardPaymentScreen() {
  return (
    <Container>
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-2xl font-semibold mb-2">
            Pagamento com cartão
          </Text>
          <Text className="text-gray-500 mb-6">Cobrança mensal automática</Text>

          <View className="bg-white rounded-xl p-4 mb-4">
            <TextInput
              placeholder="Número do cartão"
              keyboardType="numeric"
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
            />

            <View className="flex-row gap-3">
              <TextInput
                placeholder="Validade"
                className="flex-1 bg-gray-100 rounded-xl px-4 py-3"
              />
              <TextInput
                placeholder="CVV"
                keyboardType="numeric"
                className="flex-1 bg-gray-100 rounded-xl px-4 py-3"
              />
            </View>

            <TextInput
              placeholder="Nome impresso no cartão"
              className="bg-gray-100 rounded-xl px-4 py-3 mt-3"
            />
          </View>

          <View className="bg-blue-50 rounded-xl p-4">
            <Text className="text-blue-700 text-sm">
              ✔ Você pode cancelar a assinatura a qualquer momento
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="h-14 bg-blue-600 rounded-xl items-center justify-center mb-6"
          onPress={() => router.push("/payments/paymentSuccess")}
        >
          <Text className="text-white font-semibold">Confirmar pagamento</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
