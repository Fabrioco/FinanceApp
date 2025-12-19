export type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;

  isFixed?: boolean;
  originId?: string;

  isInstallment?: boolean;
  installmentIndex?: number;
  installmentTotal?: number;
  parentId?: string;
};

export type Filter = "ALL" | "INCOME" | "EXPENSE";

export type NewTransaction = {
  title: string;
  value: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: Date;
  isFixed: boolean;
  installments?: number;
};
