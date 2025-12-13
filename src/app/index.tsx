import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import Container from "../components/Container";

export default function Index() {
  return (
    <Container>
      <View className="flex-1 justify-between">
        {/* Conteúdo principal */}
        <View className="items-center mt-20 px-6">
          {/* Ícone em destaque */}
          <View className="w-24 h-24 rounded-full bg-blue-50 items-center justify-center mb-6">
            <FontAwesome5 name="coins" size={42} color="#2563EB" />
          </View>

          {/* Textos */}
          <Text className="text-2xl font-semibold text-gray-900 text-center">
            Bem-vindo ao FinanceApp
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Controle seus gastos de forma simples e inteligente
          </Text>
        </View>

        {/* CTA */}
        <View className="px-6 mb-10">
          <TouchableOpacity
            className="bg-blue-600 h-14 rounded-xl flex-row items-center justify-center"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-white text-base font-semibold mr-2">
              Começar
            </Text>
            <FontAwesome5 name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
