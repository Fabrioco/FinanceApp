import Container from "@/src/components/Container";
import { styles } from "@/src/styles/shadow-global";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <Container>
      <View className="flex-1 flex-col items-center justify-center">
        <View className="w-full bg-white rounded-2xl p-6" style={styles.card}>
          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold text-gray-900">
              Bem-vindo 👋
            </Text>
            <Text className="text-gray-500 mt-1">
              Faça login para continuar
            </Text>
          </View>

          {/* Form */}
          <View className="gap-5">
            <View>
              <Text className="text-sm text-gray-600 mb-1">
                Email ou telefone
              </Text>
              <TextInput
                placeholder="Digite seu email"
                placeholderTextColor="#9CA3AF"
                className="w-full h-12 px-4 rounded-xl bg-gray-100 text-base"
              />
            </View>

            <View>
              <Text className="text-sm text-gray-600 mb-1">Senha</Text>
              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="w-full h-12 px-4 rounded-xl bg-gray-100 text-base"
              />
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              className="self-end"
              onPress={() => router.push("/noAuth/forgotPassword")}
            >
              <Text className="text-sm text-blue-600">Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* Button */}
            <TouchableOpacity
              className="w-full bg-blue-600 h-12 rounded-xl justify-center items-center mt-2"
              onPress={() => router.push("/dashboard")}
            >
              <Text className="text-white text-base font-semibold">Entrar</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500 text-sm">Não tem conta?</Text>
            <TouchableOpacity
              className="ml-1"
              onPress={() => router.push("/auth/register")}
            >
              <Text className="text-blue-600 text-sm font-semibold">
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}
