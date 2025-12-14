// src/components/dashboard/FiltersModal.tsx
import { Modal, View, Text, Pressable, Switch } from "react-native";

type Props = {
  visible: boolean;
  onlyFixed: boolean;
  setOnlyFixed: (v: boolean) => void;
  onClose: () => void;
};

export function FiltersModal({
  visible,
  onlyFixed,
  setOnlyFixed,
  onClose,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <Pressable className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-semibold mb-6">Filtros</Text>

          <View className="flex-row items-center justify-between">
            <Text className="font-medium">Somente fixas</Text>
            <Switch value={onlyFixed} onValueChange={setOnlyFixed} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
