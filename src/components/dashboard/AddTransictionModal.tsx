import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { useMemo, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { NewTransaction } from "@/src/types/transaction";

type Props = {
  visible: boolean;
  type: "INCOME" | "EXPENSE";
  categories: string[];
  onClose: () => void;
  onSubmit: (data: NewTransaction) => void;
};

export function AddTransactionModal({
  visible,
  type,
  categories,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.toLowerCase().includes(categoryInput.toLowerCase())
    );
  }, [categoryInput, categories]);

  function handleSave() {
    const parsedValue = Number(value);

    if (!title || !categoryInput || isNaN(parsedValue)) return;

    onSubmit({
      title,
      value: parsedValue,
      category: categoryInput,
      isFixed,
      type,
      date: new Date(),
    });

    setTitle("");
    setValue("");
    setCategoryInput("");
    setIsFixed(false);
    setShowCategoryList(false);
    onClose();
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* BACKDROP */}
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        {/* CONTEÚDO */}
        <Pressable className="bg-white rounded-t-3xl p-6" onPress={() => {}}>
          <Text className="text-xl font-semibold mb-4">
            Nova {type === "INCOME" ? "Receita" : "Despesa"}
          </Text>

          <Pressable onPress={onClose} className="absolute top-5 right-5">
            <Feather name="x" size={24} />
          </Pressable>

          {/* Descrição */}
          <TextInput
            placeholder="Descrição"
            value={title}
            onChangeText={setTitle}
            className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
          />

          {/* Valor */}
          <TextInput
            placeholder="Valor"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
          />

          {/* Categoria */}
          <TextInput
            placeholder="Categoria"
            value={categoryInput}
            onChangeText={(text) => {
              setCategoryInput(text);
              setShowCategoryList(true);
            }}
            className="bg-gray-100 rounded-xl px-4 py-3"
          />

          {showCategoryList && (
            <View className="bg-white border border-gray-200 rounded-xl mt-2 max-h-40">
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {filteredCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    className="px-4 py-3 border-b border-gray-100"
                    onPress={() => {
                      setCategoryInput(cat);
                      setShowCategoryList(false);
                    }}
                  >
                    <Text>{cat}</Text>
                  </TouchableOpacity>
                ))}

                {filteredCategories.length === 0 &&
                  categoryInput.length > 0 && (
                    <TouchableOpacity
                      className="px-4 py-3"
                      onPress={() => {
                        setShowCategoryList(false);
                      }}
                    >
                      <Text className="text-blue-600 font-semibold">
                        + Criar categoria `{categoryInput}`
                      </Text>
                    </TouchableOpacity>
                  )}
              </ScrollView>
            </View>
          )}

          {/* Fixa */}
          <View className="flex-row items-center justify-between mt-4">
            <View>
              <Text className="font-medium">
                {type === "INCOME" ? "Receita fixa" : "Despesa fixa"}
              </Text>
              <Text className="text-gray-400 text-sm">
                Repete todos os meses
              </Text>
            </View>

            <Switch value={isFixed} onValueChange={setIsFixed} />
          </View>

          {/* Botão */}
          <TouchableOpacity
            className={`mt-6 h-14 rounded-xl items-center justify-center ${
              type === "INCOME" ? "bg-blue-600" : "bg-red-600"
            }`}
            onPress={handleSave}
          >
            <Text className="text-white font-semibold">Salvar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
