import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { router } from "expo-router";

export default function PaymentSuccessScreen() {
  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
          <Feather name="check" size={40} color="#16A34A" />
        </View>

        <Text className="text-2xl font-semibold mb-2">
          Pagamento confirmado!
        </Text>

        <Text className="text-gray-500 text-center mb-8">
          Seu Plano Pro foi ativado com sucesso 🎉
        </Text>

        <TouchableOpacity
          className="h-14 px-10 bg-green-600 rounded-xl items-center justify-center"
          onPress={() => router.replace("/payments/paymentSuccess")}
        >
          <Text className="text-white font-semibold">Voltar ao app</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
