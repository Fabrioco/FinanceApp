export type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  isFixed: boolean;
};

export type NewTransaction = {
  title: string;
  value: number;
  category: string;
  isFixed: boolean;
};
