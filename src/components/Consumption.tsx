import { css } from "@emotion/react"
import ICardTransactionVM from "adapters/vms/interfaces/ICardTransactionVM"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import CardTransaction from "./items/CardTransaction"
import AccountTransaction from "./items/AccountTransaction"
import IAccountTransactionVM from "adapters/vms/interfaces/IAccountTransactionVM"

export default function Consumption({
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
          margin: 0;
          padding: 0;
          list-style: none;
          li:not(:first-of-type) {
            margin-top: 0.5rem;
          }
        `}
      >
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction instanceof CardTransactionVM ? (
              <CardTransaction transaction={transaction} />
            ) : (
              <AccountTransaction
                transaction={transaction as IAccountTransactionVM}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
