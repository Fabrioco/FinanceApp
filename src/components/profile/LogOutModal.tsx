import { Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showLogoutModal: boolean;
  setShowLogoutModal: (value: boolean) => void;
};

export default function LogOutModal({
  showLogoutModal,
  setShowLogoutModal,
}: Props) {
  return (
    <Modal transparent visible={showLogoutModal} animationType="slide">
      <View className="flex-1 bg-black/30 justify-end px-4">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-semibold mb-3">
            Deseja sair da conta?
          </Text>
          <Text className="text-gray-500 mb-6">
            Você precisará entrar novamente.
          </Text>

          <TouchableOpacity
            className="h-12 bg-red-600 rounded-xl items-center justify-center mb-3"
            onPress={() => {
              // logout real depois
              setShowLogoutModal(false);
            }}
          >
            <Text className="text-white font-semibold">Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="h-12 bg-gray-200 rounded-xl items-center justify-center"
            onPress={() => setShowLogoutModal(false)}
          >
            <Text className="text-gray-600 font-semibold">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
