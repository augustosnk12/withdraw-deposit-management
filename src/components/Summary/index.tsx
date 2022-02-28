import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { maskBrazilCurrency } from "../../utils/generalFunctions";

import { Container } from "./styles";

export function Summary() {
  const { transactionList } = useTransactions();

  const summaryDeposit = transactionList.reduce((acc, transaction) => {
    if (transaction.type === "deposit")
      return Number(acc) + Number(transaction.value);
    else return acc;
  }, 0);
  
  const summaryWithdraw = transactionList.reduce((acc, transaction) => {
    if (transaction.type === "withdraw")
      return Number(acc) + Number(transaction.value);
    else return acc;
  }, 0);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{maskBrazilCurrency(summaryDeposit)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>-{maskBrazilCurrency(summaryWithdraw)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{maskBrazilCurrency(summaryDeposit - summaryWithdraw)}</strong>
      </div>
    </Container>
  );
}
