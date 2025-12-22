import Container from "@/src/components/Container";
import { styles } from "@/src/styles/shadow-global";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";

export default function Register() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Container>
      <View className="flex-1 flex-col items-center justify-center">
        <View className="w-full bg-white rounded-2xl p-6" style={styles.card}>
          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold text-gray-900">
              Seja bem-vindo ao FinanceApp 👋
            </Text>
            <Text className="text-gray-500 mt-1">
              Siga as etapas para criar sua conta.
            </Text>
          </View>

          {/* Form  */}
          <View className="gap-5">
            <View>
              <Text className="text-sm text-gray-600 mb-1">Nome completo</Text>
              <TextInput
                placeholder="Digite seu nome completo"
                placeholderTextColor="#9CA3AF"
                className="w-full h-12 px-4 rounded-xl bg-gray-100 text-base"
              />
            </View>

            <View>
              <Text className="text-sm text-gray-600 mb-1">Email</Text>
              <TextInput
                placeholder="Digite seu email"
                placeholderTextColor="#9CA3AF"
                className="w-full h-12 px-4 rounded-xl bg-gray-100 text-base"
              />
            </View>

            <View>
              <Text className="text-sm text-gray-600 mb-1">
                Telefone (opcional)
              </Text>
              <TextInput
                placeholder="Digite seu telefone"
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

            <View
              className="flex flex-row items-center gap-2"
              style={{ marginTop: 10 }}
            >
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? "#2563EB" : undefined}
              />
              <Text>Eu aceito os termos de uso e privacidade</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              className="w-full bg-blue-600 h-12 rounded-xl justify-center items-center mt-2"
              onPress={() => router.push("/onBoarding")}
            >
              <Text className="text-white text-base font-semibold">
                Registrar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500 text-sm">Já tem conta?</Text>
            <TouchableOpacity
              className="ml-1"
              onPress={() => router.push("/auth/login")}
            >
              <Text className="text-blue-600 text-sm font-semibold">
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}
