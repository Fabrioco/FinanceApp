import { Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showExportModal: boolean;
  setShowExportModal: (value: boolean) => void;
};

export default function ExportModal({
  showExportModal,
  setShowExportModal,
}: Props) {
  return (
    <Modal transparent visible={showExportModal} animationType="slide">
      <View className="flex-1 bg-black/30 justify-end px-4">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-semibold mb-3">Exportar dados</Text>
          <Text className="text-gray-500 mb-6">
            Seus dados financeiros serão exportados em formato CSV.
          </Text>

          <TouchableOpacity
            className="h-12 bg-blue-600 rounded-xl items-center justify-center mb-3"
            onPress={() => setShowExportModal(false)}
          >
            <Text className="text-white font-semibold">Exportar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="h-12 bg-gray-200 rounded-xl items-center justify-center"
            onPress={() => setShowExportModal(false)}
          >
            <Text className="text-gray-600 font-semibold">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
