import React from "react";

import { api } from "../services/api";

interface TransactionProps {
  title: string;
  value: number;
  id: number;
  category: string;
  createdAt: string;
  type: string;
}

//Omit serve para copiar a interface mas excluindo alguns valores
type TransactionInputProps = Omit<TransactionProps, "id" | "createdAt">;

interface TransactionProviderProps {
  children: React.ReactNode;
}

interface TransactionContextProps {
  transactionList: TransactionProps[];
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = React.createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactionList, setTransactionList] = React.useState<
    TransactionProps[]
  >([]);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const response = await api.post("/transactions", transactionInput);
    const { transaction } = response.data;

    setTransactionList([...transactionList, transaction]);
  }

  React.useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactionList(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactionList, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = React.useContext(TransactionsContext);

  return context;
}