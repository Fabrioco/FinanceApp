import { Transaction } from "@/src/types/transaction";

type InstallmentInput = {
  title: string;
  totalValue: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  startDate: Date;
  count: number;
};

export function generateInstallments(data: InstallmentInput): Transaction[] {
  const parentId = crypto.randomUUID();
  const value = Number((data.totalValue / data.count).toFixed(2));

  return Array.from({ length: data.count }).map((_, index) => {
    const date = new Date(
      data.startDate.getFullYear(),
      data.startDate.getMonth() + index,
      data.startDate.getDate()
    );

    return {
      id: crypto.randomUUID(),
      parentId,
      title: `${data.title} (${index + 1}/${data.count})`,
      value,
      type: data.type,
      category: data.category,
      date: date.toISOString(),
      isInstallment: true,
      installmentIndex: index + 1,
      installmentTotal: data.count,
    };
  });
}

export function replicateFixed(transactions: Transaction[], month: Date) {
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
      const base = new Date(fixed.date);
      const date = new Date(
        month.getFullYear(),
        month.getMonth(),
        base.getDate()
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
