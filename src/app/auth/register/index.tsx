import Container from "@/src/components/Container";
import { styles } from "@/src/styles/shadow-global";
import { router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { useRef, useState } from "react";
import Toast from "react-native-toast-message";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [checkboxError, setCheckboxError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  function validate() {
    if (!name) {
      setNameError(true);
      return false;
    }
    if (!email) {
      setEmailError(true);
      return false;
    }
    if (password.length < 6) {
      setPasswordError(true);
      return false;
    }
    if (!isChecked) {
      setCheckboxError(true);
      Toast.show({
        type: "error",
        text1: "Campos inválidos",
        text2: "Aceite os termos",
      });
      return false;
    }
    return true;
  }

  async function handleRegister() {
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
        "https://194065dd3e5c.ngrok-free.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );
      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Algo deu errado",
          text2: response.statusText,
        });
      }

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Conta criada com sucesso",
      });
      router.replace("/dashboard");
    } catch {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: "Tente novamente",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 items-center justify-center">
              <View
                className="w-full bg-white rounded-2xl p-6"
                style={styles.card}
              >
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
                    <Text className="text-sm text-gray-600 mb-1">
                      Nome completo
                    </Text>
                    <TextInput
                      placeholder="Digite seu nome completo"
                      placeholderTextColor="#9CA3AF"
                      className={`w-full h-12 px-4 rounded-xl ${
                        nameError
                          ? "bg-red-100 border border-red-400"
                          : "bg-gray-100"
                      }`}
                      textContentType="name"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                      autoCorrect
                      autoFocus
                      ref={nameRef}
                      onSubmitEditing={() => emailRef.current?.focus()}
                      returnKeyType="next"
                    />
                  </View>

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
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      ref={emailRef}
                      onSubmitEditing={() => phoneRef.current?.focus()}
                      returnKeyType="next"
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
                      value={phone}
                      onChangeText={setPhone}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="phone-pad"
                      textContentType="telephoneNumber"
                      ref={phoneRef}
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  </View>

                  <View>
                    <Text className="text-sm text-gray-600 mb-1">Senha</Text>
                    <TextInput
                      placeholder="Digite sua senha"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry
                      className={`w-full h-12 px-4 rounded-xl ${
                        passwordError
                          ? "bg-red-100 border border-red-400"
                          : "bg-gray-100"
                      }`}
                      textContentType="password"
                      value={password}
                      onChangeText={setPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={passwordRef}
                      onSubmitEditing={handleRegister}
                      returnKeyType="done"
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
                      className={`w-5 h-5 ${
                        checkboxError ? "border border-red-500" : ""
                      }`}
                    />
                    <Text>Eu aceito os termos de uso e privacidade</Text>
                  </View>

                  {/* Button */}
                  <TouchableOpacity
                    className="w-full bg-blue-600 h-12 rounded-xl justify-center items-center mt-2"
                    onPress={handleRegister}
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
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
