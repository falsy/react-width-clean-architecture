import { css } from "@emotion/react"
import IAccount from "adapters/domains/entities/interfaces/IAccount"
import AccountItem from "./items/AccountItem"

export default function AccountList({
  response
}: {
  response?: Array<IAccount>
}) {
  const accounts = response || []

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
        {accounts.map((account) => (
          <li key={account.id}>
            <AccountItem account={account} />
          </li>
        ))}
      </ul>
    </div>
  )
}
