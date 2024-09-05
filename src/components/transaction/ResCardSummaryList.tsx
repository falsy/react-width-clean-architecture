import { css } from "@emotion/react"
import ICardTxnSummaryVM from "adapters/vms/interfaces/ICardTxnSummaryVM"
import CardSummaryItem from "./items/CardSummaryItem"

export default function ResCardSummaryList({
  response
}: {
  response?: Array<ICardTxnSummaryVM>
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
            <CardSummaryItem transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  )
}
