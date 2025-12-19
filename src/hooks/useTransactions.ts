import { useMemo, useState } from "react";
import { Transaction, Filter } from "@/src/types/transaction";
import { replicateFixed, generateInstallments } from "@/src/utils/transactions";
import { isSameMonth } from "@/src/utils/date";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const filteredTransactions = useMemo(() => {
    const withFixed = replicateFixed(transactions, currentMonth);

    return withFixed.filter(
      (t) => isSameMonth(t.date, currentMonth) && !(t.isFixed && !t.originId)
    );
  }, [transactions, currentMonth]);

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    filteredTransactions.forEach((t) => {
      if (t.type === "INCOME") income += t.value;
      else expense += t.value;
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [filteredTransactions]);

  return {
    transactions,
    setTransactions,
    filteredTransactions,
    summary,
    filter,
    setFilter,
    currentMonth,
    setCurrentMonth,
  };
}
