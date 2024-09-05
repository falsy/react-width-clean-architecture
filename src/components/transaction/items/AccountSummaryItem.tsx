import { css } from "@emotion/react"
import IAccountTxnSummaryVM from "adapters/vms/interfaces/IAccountTxnSummaryVM"

export default function AccountSummaryItem({
  transaction
}: {
  transaction: IAccountTxnSummaryVM
}) {
  return (
    <div
      css={css`
        border-radius: 8px;
        border: 1px solid #eaeaea;
        padding: 0.2rem 1rem;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0.5rem;
        p {
          margin: 0.5rem 0;
          font-size: 0.8rem;
          span {
            display: block;
            margin-bottom: 5px;
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
        <span>Date.</span> {transaction.day}({transaction.dayOfWeek})
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
