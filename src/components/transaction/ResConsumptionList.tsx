import { css } from "@emotion/react"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"
import CardTransactionItem from "./items/CardTransactionItem"
import AccountTransactionItem from "./items/AccountTransactionItem"

export default function ResConsumptionList({
  response
}: {
  response?: Array<ICardTransactionVM | IAccountTransactionVM>
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
            {transaction instanceof CardTransactionVM ? (
              <CardTransactionItem transaction={transaction} />
            ) : (
              <AccountTransactionItem
                transaction={transaction as IAccountTransactionVM}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
