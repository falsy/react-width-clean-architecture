import { css } from "@emotion/react"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"

export default function CardTransactionItem({
  transaction
}: {
  transaction: ICardTransactionVM
}) {
  return (
    <div
      css={css`
        background: #f5f5f5;
        border-radius: 8px;
        border: 1px solid #eaeaea;
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0.5rem;
        p {
          font-size: 0.8rem;
          span {
            font-size: 0.6rem;
            text-transform: uppercase;
            font-weight: 600;
            color: #aaa;
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
