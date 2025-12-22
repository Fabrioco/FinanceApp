import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { useState } from "react";
import { router } from "expo-router";

export default function VerifyTokenScreen() {
  const [token, setToken] = useState("");

  function handleVerify() {
    if (token.length < 6) return;

    Keyboard.dismiss();

    // futuramente: validar token
    router.push("/noAuth/resetPassword");
  }

  return (
    <Container>
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          {/* HEADER */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-10 mb-8 flex-row items-center gap-2"
          >
            <Feather name="arrow-left" size={20} color="#374151" />
            <Text className="text-base text-gray-700">Voltar</Text>
          </TouchableOpacity>

          {/* CONTENT */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold mb-2">
              Verificação de código
            </Text>
            <Text className="text-gray-500">
              Digite o código de 6 dígitos enviado para seu e-mail.
            </Text>
          </View>

          {/* INPUT */}
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-3 mb-6">
            <Feather name="shield" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Código de 6 dígitos"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={6}
              value={token}
              onChangeText={setToken}
              className="flex-1 text-base text-gray-800 tracking-widest"
            />
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            className={`h-14 rounded-xl items-center justify-center ${
              token.length === 6 ? "bg-blue-600" : "bg-blue-300"
            }`}
            disabled={token.length < 6}
            activeOpacity={0.85}
            onPress={handleVerify}
          >
            <Text className="text-white font-semibold text-base">
              Verificar código
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <TouchableOpacity className="mt-6 items-center">
            <Text className="text-blue-600 font-medium">Reenviar código</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Pressable>
    </Container>
  );
}
