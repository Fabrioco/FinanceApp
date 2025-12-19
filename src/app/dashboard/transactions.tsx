import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  Dimensions,
} from "react-native";
import { useMemo, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PieChart } from "react-native-chart-kit";

/* =======================
   TYPES
======================= */
type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;

  // FIXA
  isFixed?: boolean;
  originId?: string;

  // PARCELAMENTO
  isInstallment?: boolean;
  installmentIndex?: number;
  installmentTotal?: number;
  parentId?: string;
};

type Filter = "ALL" | "INCOME" | "EXPENSE";

/* =======================
   MOCK
======================= */
const INITIAL_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Moradia",
  "Saúde",
  "Trabalho",
];

/* =======================
   DATE HELPER
======================= */
function formatDateLabel(date: string) {
  const d = new Date(date);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Hoje";
  if (d.toDateString() === yesterday.toDateString()) return "Ontem";

  return d.toLocaleDateString("pt-BR");
}

/* =======================
   SCREEN
======================= */
export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Salário",
      value: 3500,
      type: "INCOME",
      category: "Trabalho",
      isFixed: true,
      date: "2025-12-01T00:00:00.000Z",
    },
    {
      id: "2",
      title: "Mercado",
      value: 120.5,
      type: "EXPENSE",
      category: "Alimentação",
      isFixed: false,
      date: new Date().toISOString(),
    },
  ]);

  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);

  const [filter, setFilter] = useState<Filter>("ALL");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

  const [editMode, setEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [isInstallment, setIsInstallment] = useState(false);
  const [installments, setInstallments] = useState("2");

  /* =======================
     COMPUTED
  ======================= */
  const filteredCategories = useMemo(() => {
    return categories.filter((c) =>
      c.toLowerCase().includes(categoryInput.toLowerCase())
    );
  }, [categoryInput, categories]);

  const filteredTransactions = useMemo(() => {
    const withFixed = replicateFixed(transactions, currentMonth);

    const monthly = withFixed.filter((t) => isSameMonth(t.date, currentMonth));

    if (filter === "ALL") return monthly;

    return monthly.filter((t) => t.type === filter);
  }, [transactions, filter, currentMonth]);

  const summaryTransactions = useMemo(() => {
    return filteredTransactions.filter((t) => {
      // Parcelas → só se for a parcela do mês atual
      if (t.isInstallment) {
        const transactionMonth = new Date(t.date);
        return isSameMonth(transactionMonth, currentMonth);
      }

      // Fixas → só a projeção do mês
      if (t.originId) {
        return isSameMonth(new Date(t.date), currentMonth);
      }

      return true;
    });
  }, [filteredTransactions, currentMonth]);

  const groupedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const groups: Record<string, Transaction[]> = {};

    sorted.forEach((t) => {
      const label = formatDateLabel(t.date);
      if (!groups[label]) groups[label] = [];
      groups[label].push(t);
    });

    return Object.entries(groups);
  }, [filteredTransactions]);

  const summary = useMemo(() => {
    const income = summaryTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.value, 0);

    const expense = summaryTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.value, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [summaryTransactions]);

  const expensesByCategory = useMemo(() => {
    const map: Record<string, number> = {};

    summaryTransactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.value;
      });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
      color: categoryColor(name),
      legendFontColor: "#374151",
      legendFontSize: 12,
    }));
  }, [summaryTransactions]);

  /* =======================
     ACTIONS
  ======================= */
  function openModal(type: "INCOME" | "EXPENSE") {
    resetForm();
    setModalType(type);
    setModalVisible(true);
  }

  function openActions(transaction: Transaction) {
    // PARCELADA
    if (transaction.isInstallment && transaction.parentId) {
      Alert.alert("Parcela", "O que deseja fazer?", [
        {
          text: "Editar só esta parcela",
          onPress: () => openEdit(transaction),
        },
        {
          text: "Editar todas",
          onPress: () => openEditFixed(transaction.originId!),
        },
        {
          text: "Apagar só esta",
          style: "destructive",
          onPress: () => deleteSingle(transaction.id),
        },
        {
          text: "Apagar todas",
          style: "destructive",
          onPress: () => {
            if (transaction.parentId) deleteFixed(transaction.parentId);
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]);
      return;
    }

    // FIXA (projeção mensal)
    if (transaction.originId) {
      Alert.alert("Transação fixa", "O que deseja fazer?", [
        {
          text: "Editar só este mês",
          onPress: () => openEdit(transaction),
        },
        {
          text: "Editar todas",
          onPress: () => {
            if (transaction.originId) openEditAllInstallments(transaction);
          },
        },
        {
          text: "Apagar só este mês",
          style: "destructive",
          onPress: () => deleteSingle(transaction.id),
        },
        {
          text: "Apagar todas",
          style: "destructive",
          onPress: () => {
            if (transaction.originId)
              deleteAllInstallments(transaction.originId);
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]);
      return;
    }

    // NORMAL
    Alert.alert("Transação", "O que deseja fazer?", [
      { text: "Editar", onPress: () => openEdit(transaction) },
      {
        text: "Apagar",
        style: "destructive",
        onPress: () => deleteSingle(transaction.id),
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  function deleteSingle(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function deleteAllInstallments(parentId: string) {
    setTransactions((prev) => prev.filter((t) => t.parentId !== parentId));
  }

  function openEditAllInstallments(transaction: Transaction) {
    setEditMode(true);
    setSelectedTransaction(transaction);
    setModalType(transaction.type);

    setTitle(transaction.title.replace(/\(\d+\/\d+\)/, "").trim());
    setValue(String(transaction.value * (transaction.installmentTotal || 1)));
    setCategoryInput(transaction.category);

    setIsInstallment(true);
    setInstallments(String(transaction.installmentTotal));

    setModalVisible(true);
  }

  function deleteFixed(originId: string) {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== originId && t.originId !== originId)
    );
  }

  function openEdit(transaction: Transaction) {
    setEditMode(true);
    setSelectedTransaction(transaction);
    setModalType(transaction.type);

    setTitle(transaction.title);
    setValue(String(transaction.value));
    setCategoryInput(transaction.category);
    if (transaction.isFixed) setIsFixed(transaction.isFixed);
    setDate(new Date(transaction.date));

    setModalVisible(true);
  }

  function openEditFixed(originId: string) {
    const fixed = transactions.find((t) => t.id === originId);
    if (!fixed) return;

    setEditMode(true);
    setSelectedTransaction(fixed);
    setModalType(fixed.type);

    setTitle(fixed.title);
    setValue(String(fixed.value));
    setCategoryInput(fixed.category);
    setIsFixed(true);
    setDate(new Date(fixed.date));

    setModalVisible(true);
  }

  function deleteTransaction(id: string) {
    Alert.alert("Excluir transação", "Tem certeza que deseja apagar?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () =>
          setTransactions((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  }

  function handleSave() {
    if (!title || !value || !categoryInput) return;

    // ✏️ EDITAR TODAS AS PARCELAS
    if (editMode && selectedTransaction?.parentId && isInstallment) {
      setTransactions((prev) => [
        ...prev.filter((t) => t.parentId !== selectedTransaction.parentId),
        ...generateInstallments({
          title,
          totalValue: Number(value),
          type: modalType,
          category: categoryInput,
          startDate: date,
          count: Number(installments),
        }),
      ]);

      resetForm();
      return;
    }

    const totalValue = Number(value);

    if (isFixed && isInstallment) {
      Alert.alert(
        "Opção inválida",
        "Uma transação não pode ser fixa e parcelada ao mesmo tempo."
      );
      return;
    }

    // ✨ PARCELADO
    if (isInstallment && Number(installments) > 1) {
      const parcels = generateInstallments({
        title,
        totalValue,
        type: modalType,
        category: categoryInput,
        startDate: date,
        count: Number(installments),
      });

      setTransactions((prev) => [...parcels, ...prev]);
    }
    // ✨ NORMAL
    else {
      setTransactions((prev) => [
        {
          id: String(Date.now()),
          title,
          value: totalValue,
          type: modalType,
          category: categoryInput,
          isFixed,
          date: date.toISOString(),
        },
        ...prev,
      ]);
    }

    // ✏️ EDITAR FIXA (TEMPLATE)
    if (editMode && selectedTransaction?.isFixed) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === selectedTransaction.id
            ? {
                ...t,
                title,
                value: Number(value),
                category: categoryInput,
                date: date.toISOString(),
              }
            : t
        )
      );

      resetForm();
      return;
    }

    if (!categories.includes(categoryInput)) {
      setCategories((prev) => [...prev, categoryInput]);
    }

    resetForm();
  }

  function resetForm() {
    setTitle("");
    setValue("");
    setCategoryInput("");
    setIsFixed(false);
    setEditMode(false);
    setSelectedTransaction(null);
    setShowCategoryList(false);
    setModalVisible(false);
  }

  /* =======================
     HELPERS
  ======================== */

  function isSameMonth(date: Date | string, base: Date) {
    const d = typeof date === "string" ? new Date(date) : date;

    return (
      d.getMonth() === base.getMonth() && d.getFullYear() === base.getFullYear()
    );
  }

  function formatMonthYear(date: Date) {
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  }

  // function hasFixedTransactionInMonth(
  //   transactions: Transaction[],
  //   fixed: Transaction,
  //   month: Date
  // ) {
  //   return transactions.some((t) => {
  //     if (t.originId !== fixed.id) return false;

  //     const d = new Date(t.date);
  //     return (
  //       d.getMonth() === month.getMonth() &&
  //       d.getFullYear() === month.getFullYear()
  //     );
  //   });
  // }

  function categoryColor(seed: string) {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215)).toString(16);

    return `#${color.padStart(6, "0")}`;
  }

  function replicateFixed(
    transactions: Transaction[],
    month: Date
  ): Transaction[] {
    const fixedRoots = transactions.filter((t) => t.isFixed && !t.originId);

    let updated = [...transactions];

    fixedRoots.forEach((fixed) => {
      const exists = updated.some((t) => {
        if (t.originId !== fixed.id) return false;
        const d = new Date(t.date);
        return (
          d.getMonth() === month.getMonth() &&
          d.getFullYear() === month.getFullYear()
        );
      });

      if (!exists) {
        const date = new Date(
          month.getFullYear(),
          month.getMonth(),
          new Date(fixed.date).getDate()
        );

        updated.push({
          ...fixed,
          id: `${fixed.id}-${month.getMonth()}`,
          originId: fixed.id,
          isFixed: false,
          date: date.toISOString(),
        });
      }
    });

    return updated;
  }

  function generateInstallments({
    title,
    totalValue,
    type,
    category,
    startDate,
    count,
  }: {
    title: string;
    totalValue: number;
    type: "INCOME" | "EXPENSE";
    category: string;
    startDate: Date;
    count: number;
  }): Transaction[] {
    const parentId = String(Date.now());
    const value = Number((totalValue / count).toFixed(2));

    return Array.from({ length: count }).map((_, i) => {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        startDate.getDate()
      );

      return {
        id: `${parentId}-${i + 1}`,
        parentId,
        title: `${title} (${i + 1}/${count})`,
        value,
        type,
        category,
        date: date.toISOString(),
        isInstallment: true,
        installmentIndex: i + 1,
        installmentTotal: count,
      };
    });
  }

  // function generateMonthlyTransactions(
  //   transactions: Transaction[],
  //   month: Date
  // ): Transaction[] {
  //   const result: Transaction[] = [];

  //   transactions.forEach((t) => {
  //     // normal
  //     if (!t.isFixed) {
  //       if (isSameMonth(t.date, month)) {
  //         result.push(t);
  //       }
  //       return;
  //     }

  //     // fixa → projeção virtual
  //     const baseDate = new Date(t.date);
  //     const projectedDate = new Date(
  //       month.getFullYear(),
  //       month.getMonth(),
  //       baseDate.getDate()
  //     );

  //     result.push({
  //       ...t,
  //       id: `${t.id}-${month.getMonth()}-${month.getFullYear()}`,
  //       date: projectedDate.toISOString(),
  //       originId: t.id,
  //     });
  //   });

  //   return result;
  // }

  /* =======================
     RENDER
  ======================= */
  return (
    <Container>
      <View className="flex-1">
        {/* HEADER */}
        <View className="mt-10">
          <Text className="text-2xl font-semibold">Transações</Text>
          <Text className="text-gray-500">Todas as movimentações</Text>
        </View>

        {/* MÊS SELECTOR */}
        <View className="flex-row items-center justify-between mt-4 mb-2">
          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
          >
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>

          <Text className="text-lg font-semibold capitalize">
            {formatMonthYear(currentMonth)}
          </Text>

          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
          >
            <Feather name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>

        {/* FILTROS */}
        <View className="flex-row gap-2 mt-4 mb-4">
          {[
            { label: "Todas", value: "ALL" },
            { label: "Entradas", value: "INCOME" },
            { label: "Saídas", value: "EXPENSE" },
          ].map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => setFilter(item.value as Filter)}
              className={`px-4 py-2 rounded-full ${
                filter === item.value ? "bg-blue-600" : "bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  filter === item.value ? "text-white" : "text-gray-600"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RESUMO */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-gray-400 text-sm">Resumo do período</Text>
          <Text className="text-2xl font-semibold mt-1">
            R$ {summary.balance.toFixed(2)}
          </Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-green-600">
              + R$ {summary.income.toFixed(2)}
            </Text>
            <Text className="text-red-600">
              - R$ {summary.expense.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* GASTOS POR CATEGORIA */}
        {expensesByCategory.length > 0 && (
          <View className="bg-white rounded-xl p-4 mb-4">
            <Text className="text-gray-500 text-sm mb-2">
              Gastos por categoria
            </Text>

            <PieChart
              data={expensesByCategory}
              width={Dimensions.get("window").width - 32}
              height={220}
              chartConfig={{
                color: () => "#000",
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="16"
              absolute
            />
          </View>
        )}

        {/* LISTA */}
        <FlatList
          data={groupedTransactions}
          keyExtractor={([label]) => label}
          contentContainerStyle={{ paddingBottom: 140 }}
          renderItem={({ item }) => {
            const [dateLabel, items] = item;

            return (
              <View className="mb-4">
                <Text className="text-gray-500 text-sm mb-2">{dateLabel}</Text>

                {items.map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    onLongPress={() => openActions(t)}
                    className="bg-white rounded-xl p-4 mb-3"
                  >
                    <View className="flex-row justify-between">
                      <Text className="font-medium">{t.title}</Text>
                      <Text
                        className={
                          t.type === "INCOME"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {t.type === "INCOME" ? "+" : "-"} R$ {t.value}
                      </Text>
                    </View>

                    <View className="flex-row justify-between mt-1">
                      <Text className="text-gray-400 text-sm">
                        {t.category}
                        {t.isInstallment &&
                          ` • Parcela ${t.installmentIndex}/${t.installmentTotal}`}
                        {t.isFixed && " • Fixa"}
                        {t.originId && !t.isFixed && " • Recorrente"}
                      </Text>

                      {t.originId && (
                        <Feather name="repeat" size={14} color="#2563EB" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
        />

        {/* FAB */}
        <View className="absolute bottom-6 right-6">
          <TouchableOpacity
            className="bg-red-600 w-14 h-14 rounded-full items-center justify-center"
            onPress={() => openModal("EXPENSE")}
          >
            <Feather name="minus" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-600 w-12 h-12 rounded-full items-center justify-center mt-3 ml-1"
            onPress={() => openModal("INCOME")}
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* MODAL */}
        <Modal transparent visible={modalVisible} animationType="slide">
          <Pressable
            className="flex-1 bg-black/20 justify-end"
            onPress={resetForm}
          >
            <Pressable className="bg-white rounded-t-3xl p-6">
              <Text className="text-xl font-semibold mb-4">
                {editMode ? "Editar" : "Nova"}{" "}
                {modalType === "INCOME" ? "Receita" : "Despesa"}
              </Text>

              <TextInput
                placeholder="Descrição"
                value={title}
                onChangeText={setTitle}
                className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
              />

              <TextInput
                placeholder="Valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
              />

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
                <View className="bg-white border rounded-xl mt-2 max-h-40">
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {filteredCategories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        className="px-4 py-3 border-b"
                        onPress={() => {
                          setCategoryInput(cat);
                          setShowCategoryList(false);
                        }}
                      >
                        <Text>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View className="flex-row items-center justify-between mt-4">
                <Text className="font-medium">
                  {modalType === "INCOME" ? "Receita fixa" : "Despesa fixa"}
                </Text>
                <Switch value={isFixed} onValueChange={setIsFixed} />
              </View>

              <View className="mt-4">
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium">
                    {modalType === "INCOME"
                      ? "Recebimento parcelado"
                      : "Pagamento parcelado"}
                  </Text>
                  <Switch
                    value={isInstallment}
                    onValueChange={setIsInstallment}
                  />
                </View>

                {isInstallment && (
                  <View className="mt-3">
                    <Text className="text-gray-500 text-sm mb-1">
                      Quantidade de parcelas
                    </Text>
                    <TextInput
                      value={installments}
                      onChangeText={setInstallments}
                      keyboardType="numeric"
                      className="bg-gray-100 rounded-xl px-4 py-3"
                    />
                  </View>
                )}
              </View>

              <View className="mt-4">
                <Text className="text-gray-500 text-sm mb-1">
                  Data da transação
                </Text>

                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="bg-gray-100 rounded-xl px-4 py-3 flex-row justify-between items-center"
                >
                  <Text>{date.toLocaleDateString("pt-BR")}</Text>
                  <Feather name="calendar" size={18} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className={`mt-6 h-14 rounded-xl items-center justify-center ${
                  modalType === "INCOME" ? "bg-blue-600" : "bg-red-600"
                }`}
                onPress={handleSave}
              >
                <Text className="text-white font-semibold">
                  {editMode ? "Salvar alterações" : "Salvar"}
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
        {showDatePicker && (
          <DateTimePicker
            key={date.toISOString()}
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (event.type === "set" && selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>
    </Container>
  );
}
