import { useState } from "react";
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";

export default function NotificationModal({
  showNotificationsModal,
  setShowNotificationsModal,
}: {
  showNotificationsModal: boolean;
  setShowNotificationsModal: (v: boolean) => void;
}) {
  const [notifyGoals, setNotifyGoals] = useState(true);
  const [notifyMonthly, setNotifyMonthly] = useState(false);

  return (
    <Modal
      transparent
      visible={showNotificationsModal}
      animationType="slide"
      onRequestClose={() => setShowNotificationsModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          {/* Handle */}
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />

          <Text className="text-xl font-semibold mb-6">Notificações</Text>

          {/* OPÇÃO 1 */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="font-medium text-base">Metas</Text>
              <Text className="text-gray-500 text-sm">
                Avisar ao concluir uma meta
              </Text>
            </View>
            <Switch value={notifyGoals} onValueChange={setNotifyGoals} />
          </View>

          {/* OPÇÃO 2 */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="font-medium text-base">Resumo mensal</Text>
              <Text className="text-gray-500 text-sm">
                Receber relatório todo mês
              </Text>
            </View>
            <Switch value={notifyMonthly} onValueChange={setNotifyMonthly} />
          </View>

          {/* BOTÕES */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              className="flex-1 h-12 bg-gray-200 rounded-xl items-center justify-center"
              onPress={() => setShowNotificationsModal(false)}
            >
              <Text className="text-gray-600 font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 h-12 bg-blue-600 rounded-xl items-center justify-center"
              onPress={() => {
                // aqui futuramente salva no backend/storage
                setShowNotificationsModal(false);
              }}
            >
              <Text className="text-white font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
