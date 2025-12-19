import { Transaction } from "@/src/types/transaction";
import { isSameMonth } from "./date";

export function replicateFixed(
  transactions: Transaction[],
  month: Date
): Transaction[] {
  const fixedRoots = transactions.filter((t) => t.isFixed && !t.originId);
  let updated = [...transactions];

  fixedRoots.forEach((fixed) => {
    const exists = updated.some((t) => {
      if (t.originId !== fixed.id) return false;
      return isSameMonth(t.date, month);
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

export function generateInstallments({
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
