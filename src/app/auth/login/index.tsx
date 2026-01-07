import Container from "@/src/components/Container";
import { styles } from "@/src/styles/shadow-global";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRef, useState } from "react";
import Toast from "react-native-toast-message";
import { translate } from "@/src/utils/translate";
import { Feather } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordRef = useRef<TextInput>(null);

  const isDisabled = !email || password.length < 6;

  async function handleLogin() {
    if (!validate()) {
      Toast.show({
        type: "error",
        text1: "Campos inválidos",
        text2: "Verifique os campos",
      });
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        "https://194065dd3e5c.ngrok-free.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Erro de conexão",
          text2: translate("credentials are incorrect"),
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Bem-vindo 🎉",
      });
      router.push("/dashboard");
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro de conexão",
        text2: "Verifique sua internet",
      });
    } finally {
      setLoading(false);
    }
  }

  function validate() {
    let valid = true;

    if (!email || !email.includes("@")) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Text className="text-sm text-gray-600 mb-1">Email</Text>
                <TextInput
                  placeholder="Digite seu email"
                  placeholderTextColor="#9CA3AF"
                  className={`w-full h-12 px-4 rounded-xl ${
                    emailError
                      ? "bg-red-100 border border-red-400"
                      : "bg-gray-100"
                  }`}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>

              <View>
                <Text className="text-sm text-gray-600 mb-1">Senha</Text>
                <View
                  className={`w-full h-12 px-4 rounded-xl flex flex-row items-center justify-between ${
                    passwordError
                      ? "bg-red-100 border border-red-400"
                      : "bg-gray-100"
                  }`}
                >
                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    autoComplete="password"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                    ref={passwordRef}
                    className="flex-1"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Feather name="eye-off" size={20} color="#9CA3AF" />
                    ) : (
                      <Feather name="eye" size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                </View>
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
                disabled={isDisabled}
                className={`w-full h-12 rounded-xl justify-center items-center mt-2 ${
                  loading ? "bg-blue-400" : "bg-blue-600"
                }`}
                onPress={handleLogin}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-semibold">Entrar</Text>
                )}
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
      </TouchableWithoutFeedback>
    </Container>
  );
}
