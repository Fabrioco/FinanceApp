import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Animated,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Container from "@/src/components/Container";
import { useEffect, useRef, useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";

/* =======================
   TYPES
======================= */
type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  dueDate?: string; // ISO string
  isCompleted: boolean;
  completedAt?: string;
};

/* =======================
   HELPERS
======================= */
function getProgress(current: number, target: number) {
  return Math.min(current / target, 1);
}

function progressColor(progress: number) {
  if (progress < 0.4) return "bg-blue-500";
  if (progress < 0.8) return "bg-green-500";
  return "bg-green-600";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}

/* =======================
   SCREEN
======================= */
export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Viagem para o Japão",
      current: 4200,
      target: 10000,
      dueDate: new Date(2026, 11, 1).toISOString(),
      isCompleted: false,
    },
    {
      id: "2",
      title: "Reserva de emergência",
      current: 3000,
      target: 6000,
      // sem dueDate
      isCompleted: false,
    },

    {
      id: "3",
      title: "Novo notebook",
      current: 5200,
      target: 5200,
      dueDate: new Date(2023, 11, 1).toISOString(),
      isCompleted: true,
      completedAt: new Date().toISOString(),
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const congratsScale = useRef(new Animated.Value(0.8)).current;
  const congratsOpacity = useRef(new Animated.Value(0)).current;

  /* FORM STATES */
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [depositValue, setDepositValue] = useState("");

  /* =======================
     ACTIONS
  ======================= */

  function resetForm() {
    setTitle("");
    setTarget("");
    setDueDate(null);
    setDepositValue("");
    setSelectedGoal(null);
  }

  function handleCreateGoal() {
    if (!title || !target) return;

    setGoals((prev) => [
      {
        id: String(Date.now()),
        title,
        current: 0,
        target: Number(target),
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        isCompleted: false,
      },
      ...prev,
    ]);

    resetForm();
    setShowAddGoalModal(false);
  }

  function handleDeposit() {
    if (!selectedGoal || !depositValue) return;

    const value = Number(depositValue);

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== selectedGoal.id) return g;

        const newCurrent = g.current + value;
        const completedNow = !g.isCompleted && newCurrent >= g.target;

        return {
          ...g,
          current: newCurrent,
          isCompleted: newCurrent >= g.target,
          completedAt: completedNow ? new Date().toISOString() : g.completedAt,
        };
      })
    );
    if (
      !selectedGoal.isCompleted &&
      value + selectedGoal.current >= selectedGoal.target
    ) {
      setTimeout(() => {
        setShowCongratsModal(true);
      }, 300);
    }

    resetForm();
    setShowDepositModal(false);
  }

  function handleEditGoal() {
    if (!selectedGoal || !title || !target) return;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== selectedGoal.id) return g;

        const newTarget = Number(target);
        const completed = g.current >= newTarget;

        return {
          ...g,
          title,
          target: newTarget,
          dueDate: dueDate ? dueDate.toISOString() : undefined,
          isCompleted: completed,
          completedAt: completed
            ? g.completedAt ?? new Date().toISOString()
            : undefined,
        };
      })
    );

    resetForm();
    setShowEditGoalModal(false);
  }

  function handleDeleteGoal() {
    if (!selectedGoal) return;

    setGoals((prev) => prev.filter((g) => g.id !== selectedGoal.id));
    resetForm();
    setShowDeleteModal(false);
  }
  /* =======================
     COMPUTED
  ======================= */
  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);

  useEffect(() => {
    if (showCongratsModal) {
      Animated.parallel([
        Animated.spring(congratsScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(congratsOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      congratsScale.setValue(0.8);
      congratsOpacity.setValue(0);
    }
  }, [showCongratsModal, congratsScale, congratsOpacity]);

  function handleWithdraw() {
    if (!selectedGoal || !withdrawAmount) return;

    const value = Number(withdrawAmount);
    if (value <= 0) return;

    if (value > selectedGoal.current) {
      Alert.alert("Valor inválido", "Você não tem esse valor disponível.");
      return;
    }

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== selectedGoal.id) return g;

        const newCurrent = Math.max(0, g.current - value);

        return {
          ...g,
          current: newCurrent,
          isCompleted: newCurrent >= g.target,
          completedAt: newCurrent < g.target ? undefined : g.completedAt,
        };
      })
    );

    setWithdrawAmount("");
    setShowWithdrawModal(false);
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <Container>
      <View className="flex-1">
        {/* HEADER */}
        <View className="mt-10 mb-6">
          <Text className="text-2xl font-semibold">Metas</Text>
          <Text className="text-gray-500">
            Acompanhe seu progresso financeiro
          </Text>
        </View>

        {/* RESUMO */}
        <View className="bg-white rounded-xl p-4 mb-6 flex-row justify-between">
          <View>
            <Text className="text-gray-400 text-xs">Metas ativas</Text>
            <Text className="text-lg font-semibold">{activeGoals.length}</Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">Total planejado</Text>
            <Text className="text-lg font-semibold">
              R${" "}
              {goals
                .reduce((acc, g) => acc + g.target, 0)
                .toLocaleString("pt-BR")}
            </Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">Total Adquirido</Text>
            <Text className="text-lg font-semibold">
              R${" "}
              {goals
                .reduce((acc, g) => acc + g.current, 0)
                .toLocaleString("pt-BR")}
            </Text>
          </View>

          <View>
            <Text className="text-gray-400 text-xs">Concluídas</Text>
            <Text className="text-lg font-semibold">
              {completedGoals.length}
            </Text>
          </View>
        </View>

        {/* LISTA */}
        <FlatList
          data={[...activeGoals, ...completedGoals]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 140 }}
          renderItem={({ item }) => {
            const progress = getProgress(item.current, item.target);

            return (
              <TouchableOpacity
                className="bg-white rounded-xl p-4 mb-4"
                activeOpacity={0.85}
                onPress={() => {
                  if (item.isCompleted) return;
                  setSelectedGoal(item);
                  setShowDepositModal(true);
                }}
                onLongPress={() => {
                  setSelectedGoal(item);
                  setShowActionsModal(true);
                }}
              >
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-semibold text-base">{item.title}</Text>

                  {item.isCompleted && (
                    <Feather name="check-circle" size={18} color="#16A34A" />
                  )}
                </View>

                <Text className="text-gray-400 text-xs mb-3">
                  até{" "}
                  {item.dueDate
                    ? formatDate(new Date(item.dueDate))
                    : "Sem prazo"}
                </Text>

                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-600 text-sm">
                    R$ {item.current.toLocaleString("pt-BR")}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    R$ {item.target.toLocaleString("pt-BR")}
                  </Text>
                </View>

                <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <View
                    className={`h-2 ${progressColor(progress)}`}
                    style={{ width: `${progress * 100}%` }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* FAB */}
        <View className="absolute bottom-6 right-6">
          <TouchableOpacity
            className="bg-blue-600 w-14 h-14 rounded-full items-center justify-center"
            onPress={() => setShowAddGoalModal(true)}
          >
            <Feather name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAIS */}
      {/* ADD GOAL */}
      <Modal transparent visible={showAddGoalModal} animationType="slide">
        <Pressable
          className="flex-1 bg-black/20 justify-end"
          onPress={() => setShowAddGoalModal(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6" onPress={() => {}}>
            <Text className="text-xl font-semibold mb-4">Nova meta</Text>

            <TextInput
              placeholder="Nome da meta"
              value={title}
              onChangeText={setTitle}
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
            />

            <TextInput
              placeholder="Valor total"
              value={target}
              onChangeText={setTarget}
              keyboardType="numeric"
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
            />

            <TouchableOpacity
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-gray-700">
                {dueDate
                  ? formatDate(dueDate)
                  : "Selecionar data limite (opcional)"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DatePicker
                value={dueDate ?? new Date()}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);

                  if (event.type === "dismissed") return;

                  setDueDate(selectedDate ?? dueDate);
                }}
              />
            )}

            <TouchableOpacity
              className="mt-6 h-14 bg-blue-600 rounded-xl items-center justify-center"
              onPress={handleCreateGoal}
            >
              <Text className="text-white font-semibold">Criar meta</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* DEPOSIT */}
      <Modal transparent visible={showDepositModal} animationType="slide">
        <Pressable
          className="flex-1 bg-black/20 justify-end"
          onPress={() => setShowDepositModal(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-semibold mb-4">Novo aporte</Text>

            <TextInput
              placeholder="Valor do aporte"
              value={depositValue}
              onChangeText={setDepositValue}
              keyboardType="numeric"
              className="bg-gray-100 rounded-xl px-4 py-3"
            />

            <TouchableOpacity
              className="mt-6 h-14 bg-green-600 rounded-xl items-center justify-center"
              onPress={handleDeposit}
            >
              <Text className="text-white font-semibold">Confirmar aporte</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* EDIT */}
      <Modal transparent visible={showEditGoalModal} animationType="slide">
        <Pressable
          className="flex-1 bg-black/20 justify-end"
          onPress={() => setShowEditGoalModal(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-semibold mb-4">Editar meta</Text>

            <TextInput
              placeholder="Nome"
              value={title}
              onChangeText={setTitle}
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
            />

            <TextInput
              placeholder="Valor total"
              value={target}
              onChangeText={setTarget}
              keyboardType="numeric"
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
            />

            <TouchableOpacity
              className="bg-gray-100 rounded-xl px-4 py-3 mb-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {dueDate
                  ? formatDate(new Date(dueDate))
                  : "Selecionar data limite"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DatePicker
                value={dueDate ?? new Date()}
                mode="date"
                display="calendar"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false); // 🔑 FECHA PRIMEIRO

                  if (event.type === "dismissed") return;

                  setDueDate(selectedDate ?? dueDate);
                }}
              />
            )}

            <TouchableOpacity
              className="mt-6 h-14 bg-blue-600 rounded-xl items-center justify-center"
              onPress={handleEditGoal}
            >
              <Text className="text-white font-semibold">
                Salvar alterações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3 h-12 rounded-xl items-center justify-center"
              onPress={handleDeleteGoal}
            >
              <Text className="text-red-600 font-medium">Excluir meta</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      {/* ACTIONS MODAL */}
      <Modal
        transparent
        visible={showActionsModal}
        animationType="slide"
        onRequestClose={() => setShowActionsModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setShowActionsModal(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-4">
            {/* Handle */}
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />

            {/* APORTAR */}
            {!selectedGoal?.isCompleted && (
              <TouchableOpacity
                className="flex-row items-center gap-3 p-4 rounded-xl active:bg-gray-100"
                onPress={() => {
                  setShowActionsModal(false);
                  setShowDepositModal(true);
                }}
              >
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                  <Feather name="plus-circle" size={18} color="#2563EB" />
                </View>
                <Text className="text-base font-medium">Novo aporte</Text>
              </TouchableOpacity>
            )}

            {/* EDITAR */}
            <TouchableOpacity
              className="flex-row items-center gap-3 p-4 rounded-xl active:bg-gray-100"
              onPress={() => {
                if (!selectedGoal) return;

                setTitle(selectedGoal.title);
                setTarget(String(selectedGoal.target));
                setDueDate(
                  selectedGoal.dueDate ? new Date(selectedGoal.dueDate) : null
                );

                setShowActionsModal(false);
                setShowEditGoalModal(true);
              }}
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Feather name="edit-2" size={18} color="#374151" />
              </View>
              <Text className="text-base font-medium">Editar meta</Text>
            </TouchableOpacity>

            {/* RETIRAR VALOR */}
            <TouchableOpacity
              className="flex-row items-center gap-3 p-4 rounded-xl active:bg-gray-100"
              onPress={() => {
                setShowActionsModal(false);
                setShowWithdrawModal(true);
              }}
            >
              <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center">
                <Feather name="minus-circle" size={18} color="#EF4444" />
              </View>
              <Text className="text-base font-medium">Retirar valor</Text>
            </TouchableOpacity>

            {/* EXCLUIR */}
            <TouchableOpacity
              className="flex-row items-center gap-3 p-4 rounded-xl"
              onPress={() => {
                setShowActionsModal(false);
                setShowDeleteModal(true);
              }}
            >
              <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center">
                <Feather name="trash-2" size={18} color="#DC2626" />
              </View>
              <Text className="text-base font-medium text-red-600">
                Excluir meta
              </Text>
            </TouchableOpacity>

            {/* CANCELAR */}
            <TouchableOpacity
              className="mt-2 p-4 rounded-xl items-center"
              onPress={() => setShowActionsModal(false)}
            >
              <Text className="text-gray-400 font-medium">Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* CONGRATS MODAL */}
      <Modal transparent visible={showCongratsModal} animationType="none">
        <View className="flex-1 bg-black/40 items-center justify-center">
          <Animated.View
            style={{
              opacity: congratsOpacity,
              transform: [{ scale: congratsScale }],
            }}
            className="bg-white rounded-3xl px-6 py-8 items-center w-[85%]"
          >
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-4">
              <Feather name="check" size={32} color="#16A34A" />
            </View>

            <Text className="text-xl font-semibold mb-2 text-center">
              Meta concluída! 🎉
            </Text>

            <Text className="text-gray-500 text-center mb-6">
              Parabéns! Você atingiu sua meta financeira.
            </Text>

            <TouchableOpacity
              className="h-12 px-8 bg-green-600 rounded-xl items-center justify-center"
              onPress={() => setShowCongratsModal(false)}
            >
              <Text className="text-white font-semibold">Continuar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <Modal transparent visible={showDeleteModal} animationType="slide">
        <View className="flex-1 bg-black/30 justify-end px-4">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-semibold mb-4">
              Você tem certeza que deseja excluir essa meta?
            </Text>
            <Text className="text-gray-500">
              Essa ação nao pode ser desfeita.
            </Text>

            <View className="flex-row gap-4 mt-4">
              <TouchableOpacity
                className="flex-1 bg-gray-200 h-12 rounded-xl items-center justify-center"
                onPress={() => setShowDeleteModal(false)}
              >
                <Text className="text-gray-600 font-semibold">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-red-600 h-12 rounded-xl items-center justify-center"
                onPress={handleDeleteGoal}
              >
                <Text className="text-white font-semibold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={showWithdrawModal} animationType="slide">
        <Text className="text-gray-400 text-sm mb-2">
          Disponível: R$ {selectedGoal?.current.toFixed(2)}
        </Text>

        <Pressable
          className="flex-1 bg-black/20 justify-end"
          onPress={() => setShowWithdrawModal(false)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6" onPress={() => {}}>
            <Text className="text-lg font-semibold mb-4">Retirar valor</Text>

            <TextInput
              placeholder="Valor para retirar"
              keyboardType="numeric"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
            />

            <TouchableOpacity
              className="bg-red-500 rounded-xl py-3"
              onPress={handleWithdraw}
            >
              <Text className="text-white text-center font-semibold">
                Confirmar retirada
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </Container>
  );
}
