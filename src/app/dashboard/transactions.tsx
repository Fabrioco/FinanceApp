import { View, Text, FlatList, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Container from "@/src/components/Container";

type Transaction = {
  id: string;
  title: string;
  date: string;
  value: number;
  type: "INCOME" | "EXPENSE";
};

export default function Transactions() {
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Salário",
      date: "01 Abr",
      value: 3500,
      type: "INCOME",
    },
    {
      id: "2",
      title: "Mercado",
      date: "03 Abr",
      value: 120.5,
      type: "EXPENSE",
    },
    {
      id: "3",
      title: "Netflix",
      date: "05 Abr",
      value: 39.9,
      type: "EXPENSE",
    },
  ];

  return (
    <Container>
      <View className="flex-1">
        {/* Header */}
        <View className="mt-10 mb-6">
          <Text className="text-2xl font-semibold text-gray-900">
            Transações
          </Text>
          <Text className="text-gray-500 mt-1">Abril de 2025</Text>
        </View>

        {/* Filtro mês (placeholder) */}
        <TouchableOpacity className="bg-white rounded-xl px-4 py-3 flex-row items-center justify-between mb-4">
          <Text className="text-gray-700">Filtrar por mês</Text>
          <FontAwesome5 name="chevron-down" size={14} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Lista */}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-4 mb-3 flex-row justify-between items-center">
              <View>
                <Text className="text-gray-900 font-medium">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.date}</Text>
              </View>

              <Text
                className={`font-semibold ${
                  item.type === "INCOME" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.type === "INCOME" ? "+" : "-"} R$ {item.value}
              </Text>
            </View>
          )}
        />

        {/* FAB */}
        <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full items-center justify-center">
          <FontAwesome5 name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </Container>
  );
}
