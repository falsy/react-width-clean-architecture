import { css } from "@emotion/react"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"

export default function CardTransaction({
  transaction
}: {
  transaction: ICardTransactionVM
}) {
  return (
    <div
      css={css`
        background: #f5f5f5;
        border-radius: 5px;
        border: 1px solid #eaeaea;
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        p {
          font-size: 0.8rem;
          span {
            font-size: 0.6rem;
            font-weight: bold;
            text-transform: uppercase;
          }
        }
      `}
    >
      <p>
        <span>Date.</span> {transaction.yearMonthDate}
      </p>
      <p>
        <span>Category.</span> {transaction.category.name}
      </p>
      <p>
        <span>Card.</span> {transaction.card.cardCompany}(
        {transaction.card.cardNumber})
      </p>
      <p>
        <span>keyword.</span> {transaction.keyword}
      </p>
      <p>
        <span>Amount.</span> {transaction.amount}
      </p>
    </div>
  )
}
