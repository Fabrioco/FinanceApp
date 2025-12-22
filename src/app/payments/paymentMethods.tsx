import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { useState } from "react";
import { router } from "expo-router";

type PaymentMethod = "pix" | "card" | "boleto";

export default function PaymentMethodScreen() {
  const [method, setMethod] = useState<PaymentMethod>("pix");

  return (
    <Container>
      <View className="flex-1 pt-10">
        {/* HEADER */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold">Pagamento</Text>
          <Text className="text-gray-500">Escolha como deseja pagar</Text>
        </View>

        {/* RESUMO */}
        <View className="bg-white rounded-xl p-4 mb-6">
          <Text className="text-xs text-gray-400 mb-1">PLANO</Text>
          <Text className="text-lg font-semibold mb-1">Plano Pro</Text>
          <Text className="text-gray-500">R$ 19,90 / mês</Text>
        </View>

        {/* MÉTODOS */}
        <View className="bg-white rounded-xl divide-y mb-10">
          {/* PIX */}
          <TouchableOpacity
            onPress={() => setMethod("pix")}
            className="flex-row items-center justify-between px-4 py-4"
          >
            <View className="flex-row items-center gap-3">
              <Feather name="zap" size={18} color="#10B981" />
              <Text className="text-base">Pix</Text>
            </View>

            {method === "pix" && (
              <Feather name="check-circle" size={18} color="#10B981" />
            )}
          </TouchableOpacity>

          {/* CARTÃO */}
          <TouchableOpacity
            onPress={() => setMethod("card")}
            className="flex-row items-center justify-between px-4 py-4"
          >
            <View className="flex-row items-center gap-3">
              <Feather name="credit-card" size={18} color="#2563EB" />
              <Text className="text-base">Cartão de crédito</Text>
            </View>

            {method === "card" && (
              <Feather name="check-circle" size={18} color="#2563EB" />
            )}
          </TouchableOpacity>

          {/* BOLETO */}
          <TouchableOpacity
            onPress={() => setMethod("boleto")}
            className="flex-row items-center justify-between px-4 py-4"
          >
            <View className="flex-row items-center gap-3">
              <Feather name="file-text" size={18} color="#6B7280" />
              <Text className="text-base">Boleto</Text>
            </View>

            {method === "boleto" && (
              <Feather name="check-circle" size={18} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="h-14 bg-green-600 rounded-xl items-center justify-center"
          onPress={() => {
            // aqui depois chama o backend / mercado pago
            console.log("Pagamento via:", method);
            if (method === "pix") router.replace("/payments/pixPayment");
            if (method === "card") router.replace("/payments/cardPayment");
            if (method === "boleto") router.replace("/payments/boletoPayment");
          }}
        >
          <Text className="text-white font-semibold text-base">
            Continuar pagamento
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
