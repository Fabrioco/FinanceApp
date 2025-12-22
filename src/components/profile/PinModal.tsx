import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  showPinModal: boolean;
  setShowPinModal: (value: boolean) => void;
  pin: string;
  setPin: (value: string) => void;
};

export default function PinModal({
  showPinModal,
  setShowPinModal,
  pin,
  setPin,
}: Props) {
  return (
    <Modal transparent visible={showPinModal} animationType="slide">
      <Pressable
        className="flex-1 bg-black/30 justify-end"
        onPress={() => setShowPinModal(false)}
      >
        <Pressable className="bg-white rounded-t-3xl p-6">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
          <Text className="text-xl font-semibold mb-6">Alterar PIN</Text>

          <TextInput
            placeholder="Novo PIN"
            keyboardType="numeric"
            secureTextEntry
            value={pin}
            onChangeText={setPin}
            className="bg-gray-100 rounded-xl px-4 py-3 mb-6"
          />

          <TouchableOpacity
            className="h-12 bg-blue-600 rounded-xl items-center justify-center"
            onPress={() => {
              setPin("");
              setShowPinModal(false);
            }}
          >
            <Text className="text-white font-semibold">Salvar PIN</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
