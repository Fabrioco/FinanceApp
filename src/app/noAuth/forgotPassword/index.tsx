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
import Toast from "react-native-toast-message";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  function handleSend() {
    if (!email) return;

    Keyboard.dismiss();

    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Sucesso",
      text2: "Email enviado com sucesso",
    });
    router.push("/noAuth/verifyToken");
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
              Esqueci minha senha
            </Text>
            <Text className="text-gray-500">
              Informe seu e-mail para receber o código de recuperação.
            </Text>
          </View>

          {/* INPUT */}
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-3 mb-6">
            <Feather name="mail" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              className="flex-1 text-base text-gray-800"
            />
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            className="h-14 bg-blue-600 rounded-xl items-center justify-center"
            activeOpacity={0.85}
            onPress={handleSend}
          >
            <Text className="text-white font-semibold text-base">
              Enviar código
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <Text className="text-center text-gray-400 text-sm mt-6">
            Verifique também sua caixa de spam
          </Text>
        </KeyboardAvoidingView>
      </Pressable>
    </Container>
  );
}
