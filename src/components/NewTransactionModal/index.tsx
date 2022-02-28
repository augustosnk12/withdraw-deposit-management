import React from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type ButtonType = "deposit" | "withdraw";

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState<ButtonType>("deposit");

  async function handleCreateNewTransaction(event: React.FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
      createdAt: new Date()
    };

    await createTransaction(data);

    cleanFormFields();
    onRequestClose();
  }

  function cleanFormFields() {
    setTitle("");
    setValue(0);
    setCategory("");
    setType("deposit");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={({ target: { value: inputValue } }) =>
            setValue(Number(inputValue))
          }
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="#33cc95"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="#e52e4d"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={({ target: { value } }) => setCategory(value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
