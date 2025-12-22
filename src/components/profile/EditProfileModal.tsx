import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

export default function EditProfileModal({
  visible,
  onClose,
  name,
  email,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  name: string;
  email: string;
  onSave: (newName: string) => void;
}) {
  const [newName, setNewName] = useState(name);

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable className="flex-1 bg-black/30 justify-end" onPress={onClose}>
        <Pressable className="bg-white rounded-t-3xl p-6" onPress={() => {}}>
          {/* HEADER */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-semibold">Editar perfil</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={22} />
            </TouchableOpacity>
          </View>

          {/* FOTO */}
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-2">
              <Feather name="user" size={32} color="#2563EB" />
            </View>

            <TouchableOpacity>
              <Text className="text-blue-600 text-sm">Trocar foto</Text>
            </TouchableOpacity>
          </View>

          {/* NOME */}
          <Text className="text-xs text-gray-400 mb-1">Nome</Text>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
          />

          {/* EMAIL */}
          <Text className="text-xs text-gray-400 mb-1">Email</Text>
          <TextInput
            value={email}
            editable={false}
            className="bg-gray-100 rounded-xl px-4 py-3 opacity-60 mb-6"
          />

          {/* SALVAR */}
          <TouchableOpacity
            onPress={() => {
              onSave(newName);
              onClose();
            }}
            className="bg-blue-600 py-4 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">Salvar alterações</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
