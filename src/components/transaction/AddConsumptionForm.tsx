import { useState } from "react"
import { css } from "@emotion/react"
import IAccount from "adapters/domains/entities/interfaces/IAccount"
import ICard from "adapters/domains/entities/interfaces/ICard"
import AddConsumptionAction from "./containers/AddConsumptionAction"
import { IRequestTransactionParams } from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"

export default function AddConsumptionForm({
  response
}: {
  response?: {
    cards: ICard[]
    accounts: IAccount[]
  }
}) {
  const { cards, accounts } = response || {
    cards: [],
    accounts: []
  }

  const [transactionData, setTransactionData] =
    useState<IRequestTransactionParams>({
      amount: 0,
      keyword: "",
      cardId: "",
      accountId: ""
    })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setTransactionData((prevtransactionData) => ({
      ...prevtransactionData,
      cardId: name === "accountId" ? "" : prevtransactionData.cardId,
      accountId: name === "cardId" ? "" : prevtransactionData.accountId,
      [name]: name === "amount" ? parseInt(value, 10) : value
    }))
  }

  return (
    <div>
      <div
        css={css`
          background: #fff;
          border-radius: 8px;
          border: 1px solid #eaeaea;
          padding: 0.5rem 1rem 1rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 1rem;
          p {
            font-size: 0.6rem;
            text-transform: uppercase;
            font-weight: 600;
            color: #aaa;
          }

          input,
          select {
            box-sizing: border-box;
            width: 100%;
            font-size: 0.8rem;
            line-height: 2rem;
            height: 2rem;
            border: 1px solid #ddd;
            padding: 0 0.5rem;
          }

          @media (max-width: 500px) {
            grid-template-columns: repeat(2, 1fr);
          }
        `}
      >
        <div>
          <p>Card</p>
          <select
            name="cardId"
            value={transactionData.cardId}
            onChange={handleInputChange}
          >
            <option value="">Select a card</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.cardCompany}(${card.cardNumber})
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Account</p>
          <select
            name="accountId"
            value={transactionData.accountId}
            onChange={handleInputChange}
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName}(${account.accountNumber})
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Keyword</p>
          <input
            type="text"
            name="keyword"
            value={transactionData.keyword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Amount</p>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <AddConsumptionAction transactionData={transactionData} />
    </div>
  )
}
