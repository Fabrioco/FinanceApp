import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { router } from "expo-router";

export default function PlansScreen({ navigation }: any) {
  const currentPlan = "free"; // depois vem do backend

  return (
    <Container>
      <View className="flex-1 pt-10">
        {/* HEADER */}
        <View className="mb-8">
          <Text className="text-2xl font-semibold">Planos</Text>
          <Text className="text-gray-500">Escolha o plano ideal para você</Text>
        </View>

        {/* PLANO ATUAL */}
        <View className="bg-white rounded-xl p-4 mb-6 border border-blue-200">
          <Text className="text-xs text-blue-600 mb-1">PLANO ATUAL</Text>
          <Text className="text-lg font-semibold">Gratuito</Text>

          <View className="mt-3 space-y-2">
            <Text className="text-gray-600 text-sm">• Até 3 metas</Text>
            <Text className="text-gray-600 text-sm">
              • Sem exportação de dados
            </Text>
            <Text className="text-gray-600 text-sm">• Sem biometria</Text>
          </View>
        </View>

        {/* PLANO PRO */}
        <View className="bg-white rounded-xl p-5 mb-8 border border-yellow-400">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold">Plano Pro</Text>
            <View className="px-2 py-1 bg-yellow-100 rounded-full">
              <Text className="text-xs text-yellow-700 font-medium">
                RECOMENDADO
              </Text>
            </View>
          </View>

          <Text className="text-3xl font-bold mb-1">R$ 19,90</Text>
          <Text className="text-gray-400 text-sm mb-4">por mês</Text>

          <View className="space-y-2 mb-6">
            <Text className="text-gray-700 text-sm">• Metas ilimitadas</Text>
            <Text className="text-gray-700 text-sm">
              • Exportar dados (PDF / Excel)
            </Text>
            <Text className="text-gray-700 text-sm">• Biometria e PIN</Text>
            <Text className="text-gray-700 text-sm">• Temas premium</Text>
            <Text className="text-gray-700 text-sm">• Suporte prioritário</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            className="h-14 bg-blue-600 rounded-xl items-center justify-center"
            onPress={() => router.replace("/payments/paymentMethods")}
          >
            <Text className="text-white font-semibold text-base">
              Assinar Plano Pro
            </Text>
          </TouchableOpacity>
        </View>

        {/* INFO */}
        <Text className="text-xs text-gray-400 text-center px-6">
          Você pode cancelar a qualquer momento.
        </Text>
      </View>
    </Container>
  );
}
