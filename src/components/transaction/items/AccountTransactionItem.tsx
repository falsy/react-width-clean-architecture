import { css } from "@emotion/react"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"

export default function AccountTransactionItem({
  transaction
}: {
  transaction: IAccountTransactionVM
}) {
  return (
    <div
      css={css`
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
        @media (max-width: 500px) {
          padding: 0.7rem 1rem;
          grid-template-columns: repeat(2, 1fr);
          p {
            margin: 0.3rem 0;
          }
        }
      `}
    >
      <p>
        <span>Date.</span> {transaction.yearMonthDate}
      </p>
      <p></p>
      <p>
        <span>Account.</span> {transaction.account.bankName}(
        {transaction.account.accountNumber})
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
