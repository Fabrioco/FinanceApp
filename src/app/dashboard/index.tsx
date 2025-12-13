import { Text, TouchableOpacity, View, FlatList } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Container from "@/src/components/Container";

export default function Dashboard() {
  const transactions = [
    { id: "1", title: "Salário", value: 3500, type: "INCOME" },
    { id: "2", title: "Mercado", value: 120.5, type: "EXPENSE" },
    { id: "3", title: "Netflix", value: 39.9, type: "EXPENSE" },
  ];

  return (
    <Container>
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="mt-10">
          <Text className="text-gray-500">Olá,</Text>
          <Text className="text-2xl font-semibold text-gray-900">
            Fabricio 👋
          </Text>
        </View>

        {/* Saldo */}
        <View className="mt-6 bg-white rounded-2xl p-6">
          <Text className="text-gray-500">Saldo atual</Text>
          <Text className="text-3xl font-bold text-gray-900 mt-2">
            R$ 3.339,60
          </Text>
        </View>

        {/* Resumo */}
        <View className="flex-row justify-between mt-4 gap-4">
          <View className="flex-1 bg-white rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <FontAwesome5 name="arrow-up" size={14} color="#16A34A" />
              <Text className="text-gray-500 text-sm">Entradas</Text>
            </View>
            <Text className="text-lg font-semibold text-green-600">
              R$ 3.500,00
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4">
            <View className="flex-row items-center gap-2 mb-2">
              <FontAwesome5 name="arrow-down" size={14} color="#DC2626" />
              <Text className="text-gray-500 text-sm">Saídas</Text>
            </View>
            <Text className="text-lg font-semibold text-red-600">
              R$ 160,40
            </Text>
          </View>
        </View>

        {/* Ação */}
        <TouchableOpacity className="bg-blue-600 h-14 rounded-xl flex-row items-center justify-center mt-6">
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text className="text-white text-base font-semibold ml-2">
            Nova transação
          </Text>
        </TouchableOpacity>

        {/* Últimas transações */}
        <View className="mt-8 flex-1">
          <Text className="text-lg font-semibold mb-4">Últimas transações</Text>

          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center">
                <Text className="text-gray-900">{item.title}</Text>
                <Text
                  className={
                    item.type === "INCOME"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {item.type === "INCOME" ? "+" : "-"} R$ {item.value}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </Container>
  );
}
