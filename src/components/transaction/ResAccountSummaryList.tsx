import { css } from "@emotion/react"
import IAccountTxnSummaryVM from "adapters/vms/interfaces/IAccountTxnSummaryVM"
import AccountSummaryItem from "./items/AccountSummaryItem"

export default function ResAccountSummaryList({
  response
}: {
  response?: Array<IAccountTxnSummaryVM>
}) {
  const transactions = response || []
  const sortedTransactions = transactions.sort((a, b) => {
    return b.longTime - a.longTime
  })

  return (
    <div>
      <ul
        css={css`
          li:not(:first-of-type) {
            margin-top: 0.5rem;
          }
        `}
      >
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <AccountSummaryItem transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  )
}
