import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PixPaymentScreen() {
  return (
    <Container>
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-2xl font-semibold mb-2">Pagamento via Pix</Text>
          <Text className="text-gray-500 mb-6">
            Escaneie o QR Code ou copie o código Pix
          </Text>

          {/* QR CODE PLACEHOLDER */}
          <View className="bg-gray-100 h-64 rounded-xl items-center justify-center mb-4">
            <FontAwesome5 name="qrcode" size={64} color="#6B7280" />
            <Text className="text-gray-400 mt-2">QR Code Pix</Text>
          </View>

          {/* CÓDIGO PIX */}
          <View className="bg-white rounded-xl p-4">
            <Text className="text-gray-400 text-xs mb-1">Código Pix</Text>
            <Text className="text-gray-700 text-sm">
              00020101021226870014br.gov.bcb.pix...
            </Text>

            <TouchableOpacity className="mt-3">
              <Text className="text-blue-600 font-medium">Copiar código</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="h-14 bg-green-600 rounded-xl items-center justify-center mb-6"
          onPress={() => router.push("/payments/paymentSuccess")}
        >
          <Text className="text-white font-semibold">
            Já realizei o pagamento
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
