import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { useState } from "react";
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  function handleReset() {
    if (!password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    // futuramente: validar token + chamar API
    setSuccess(true);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* HEADER */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-10 mb-6 flex-row items-center gap-2"
        >
          <Feather name="arrow-left" size={20} color="#374151" />
          <Text className="text-base text-gray-700">Voltar</Text>
        </TouchableOpacity>

        {!success ? (
          <>
            {/* CONTENT */}
            <View className="mb-8">
              <Text className="text-2xl font-semibold mb-2">
                Redefinir senha
              </Text>
              <Text className="text-gray-500">
                Crie uma nova senha para sua conta.
              </Text>
            </View>

            {/* PASSWORD */}
            <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-2 mb-4">
              <Feather name="lock" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Nova senha"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="flex-1 text-base"
              />
            </View>

            {/* CONFIRM PASSWORD */}
            <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-2 mb-6">
              <Feather name="lock" size={18} color="#9CA3AF" />
              <TextInput
                placeholder="Confirmar nova senha"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="flex-1 text-base"
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              className="h-14 bg-blue-600 rounded-xl items-center justify-center"
              activeOpacity={0.8}
              onPress={handleReset}
            >
              <Text className="text-white font-semibold text-base">
                Salvar nova senha
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* SUCCESS */}
            <View className="items-center mt-20 px-6">
              <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6">
                <Feather name="check" size={36} color="#16A34A" />
              </View>

              <Text className="text-xl font-semibold mb-2 text-center">
                Senha redefinida
              </Text>

              <Text className="text-gray-500 text-center mb-8">
                Sua senha foi alterada com sucesso. Faça login novamente.
              </Text>

              <TouchableOpacity
                className="h-14 bg-blue-600 rounded-xl items-center justify-center w-full"
                onPress={() => router.replace("/auth/login")}
              >
                <Text className="text-white font-semibold text-base">
                  Voltar para o login
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </Container>
  );
}
