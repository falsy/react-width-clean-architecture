import { css } from "@emotion/react"
import IAccount from "adapters/domains/entities/interfaces/IAccount"

export default function AccountItem({ account }: { account: IAccount }) {
  return (
    <div
      css={css`
        background: ${account.accountType === "CURRENT" ? "#f5f5f5" : "#fff"};
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
        <span>Type.</span> {account.accountType}
      </p>
      <p>
        <span>Name.</span> {account.bankName}
      </p>
      <p>
        <span>Number.</span> {account.accountNumber}
      </p>
      <p>
        <span>Balance.</span> {account.balance}
      </p>
    </div>
  )
}
