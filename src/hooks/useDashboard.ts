import { useState, useMemo } from "react";
import { Transaction } from "@/src/types/transaction";
import { INITIAL_CATEGORIES } from "../contants/categories";

export function useDashboard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE">("INCOME");

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const transactions: Transaction[] = useMemo(
    () => [
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
    ],
    []
  );

  function openModal(type: "INCOME" | "EXPENSE") {
    setModalType(type);
    setIsFixed(false);
    setModalVisible(true);
  }

  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(categoryInput.toLowerCase())
  );

  const mostUsedCategory = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.value;
      });

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  }, [transactions]);

  return {
    // state
    modalVisible,
    modalType,
    title,
    value,
    categoryInput,
    categories,
    showCategoryList,
    isFixed,
    transactions,

    // setters
    setModalVisible,
    setModalType,
    setTitle,
    setValue,
    setCategoryInput,
    setCategories,
    setShowCategoryList,
    setIsFixed,

    // computed
    filteredCategories,
    mostUsedCategory,

    // actions
    openModal,
  };
}
