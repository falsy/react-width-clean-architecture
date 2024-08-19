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
        <span>Category.</span> {transaction.keyword}
      </p>
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
