import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showThemeModal: boolean;
  setShowThemeModal: (value: boolean) => void;
  theme: "light" | "dark" | "system";
  setTheme: (value: "light" | "dark" | "system") => void;
};

export default function ThemeModal({
  showThemeModal,
  setShowThemeModal,
  theme,
  setTheme,
}: Props) {
  return (
    <Modal transparent visible={showThemeModal} animationType="slide">
      <Pressable
        className="flex-1 bg-black/30 justify-end"
        onPress={() => setShowThemeModal(false)}
      >
        <Pressable className="bg-white rounded-t-3xl p-6">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
          <Text className="text-xl font-semibold mb-6">Tema</Text>

          {[
            { key: "light", label: "Claro" },
            { key: "dark", label: "Escuro" },
            { key: "system", label: "Sistema" },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              className="flex-row justify-between items-center p-4 rounded-xl active:bg-gray-100"
              onPress={() => setTheme(item.key as any)}
            >
              <Text className="text-base">{item.label}</Text>
              {theme === item.key && (
                <Feather name="check" size={18} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="mt-6 h-12 bg-blue-600 rounded-xl items-center justify-center"
            onPress={() => setShowThemeModal(false)}
          >
            <Text className="text-white font-semibold">Aplicar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
