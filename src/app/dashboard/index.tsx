import { View, FlatList } from "react-native";
import { useMemo, useState } from "react";
import Container from "@/src/components/Container";

import { Header } from "@/src/components/dashboard/Header";
import { PeriodSelector } from "@/src/components/dashboard/PeriodSeletor";
import { BalanceCard } from "@/src/components/dashboard/BalanceCard";
import { SummaryCards } from "@/src/components/dashboard/SummaryCards";
import { MostUsedCategory } from "@/src/components/dashboard/MostUsedCategory";
import ActionsModal from "@/src/components/dashboard/ActionsModal";
import { AddTransactionModal } from "@/src/components/dashboard/AddTransictionModal";
import { FixedExpensesCard } from "@/src/components/dashboard/FixesExpensesCard";
import { ProjectionCard } from "@/src/components/dashboard/ProjectionCard";
import { CategoryChartPlaceholder } from "@/src/components/dashboard/CategoryChartPlaceholder";
import { InsightsCard } from "@/src/components/dashboard/InsightCard";
import { TransactionItem } from "@/src/components/dashboard/TransactionItem";

type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  isFixed: boolean;
};

const INITIAL_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Moradia",
  "Saúde",
  "Trabalho",
];

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Salário",
      value: 3500,
      type: "INCOME",
      category: "Trabalho",
      isFixed: true,
    },
    {
      id: "2",
      title: "Mercado",
      value: 120.5,
      type: "EXPENSE",
      category: "Alimentação",
      isFixed: false,
    },
    {
      id: "3",
      title: "Netflix",
      value: 39.9,
      type: "EXPENSE",
      category: "Lazer",
      isFixed: true,
    },
    {
      id: "4",
      title: "Uber",
      value: 45,
      type: "EXPENSE",
      category: "Transporte",
      isFixed: false,
    },
  ]);

  const mostUsedCategory = useMemo(() => {
    const totals: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.value;
      });

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  }, [transactions]);

  const incomeTotal = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "INCOME")
        .reduce((acc, t) => acc + t.value, 0),
    [transactions]
  );

  const expenseTotal = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((acc, t) => acc + t.value, 0),
    [transactions]
  );

  const balance = incomeTotal - expenseTotal;

  function openModal(type: "INCOME" | "EXPENSE") {
    setModalType(type);
    setModalVisible(true);
  }

  return (
    <Container>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <View>
            <Header />

            <PeriodSelector
              period="Abril"
              onNext={() => {}}
              onPrev={() => {}}
            />

            <BalanceCard balance={balance.toFixed(2)} />

            <SummaryCards income={incomeTotal} expense={expenseTotal} />

            <MostUsedCategory data={mostUsedCategory} />

            <FixedExpensesCard transactions={transactions} />
            <ProjectionCard transactions={transactions} />
            <CategoryChartPlaceholder />
            <InsightsCard transactions={transactions} />

            <ActionsModal
              onIncome={() => openModal("INCOME")}
              onExpense={() => openModal("EXPENSE")}
            />
          </View>
        }
      />

      <AddTransactionModal
        visible={modalVisible}
        type={modalType}
        categories={categories}
        onClose={() => setModalVisible(false)}
        onSubmit={(data) => {
          setTransactions((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: modalType,
              ...data,
            },
          ]);

          if (!categories.includes(data.category)) {
            setCategories((prev) => [...prev, data.category]);
          }
        }}
      />
    </Container>
  );
}
