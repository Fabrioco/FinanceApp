import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showCurrencyModal: boolean;
  setShowCurrencyModal: (value: boolean) => void;
  currency: string;
  setCurrency: (value: string) => void;
};

export default function CurrencyModal({
  showCurrencyModal,
  setShowCurrencyModal,
  currency,
  setCurrency,
}: Props) {
  return (
    <Modal transparent visible={showCurrencyModal} animationType="slide">
      <Pressable
        className="flex-1 bg-black/30 justify-end"
        onPress={() => setShowCurrencyModal(false)}
      >
        <Pressable className="bg-white rounded-t-3xl p-6">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
          <Text className="text-xl font-semibold mb-6">Moeda</Text>

          {["BRL", "USD", "EUR"].map((item) => (
            <TouchableOpacity
              key={item}
              className="flex-row justify-between items-center p-4 rounded-xl active:bg-gray-100"
              onPress={() => setCurrency(item)}
            >
              <Text className="text-base">{item}</Text>
              {currency === item && (
                <Feather name="check" size={18} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="mt-6 h-12 bg-blue-600 rounded-xl items-center justify-center"
            onPress={() => setShowCurrencyModal(false)}
          >
            <Text className="text-white font-semibold">Salvar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
