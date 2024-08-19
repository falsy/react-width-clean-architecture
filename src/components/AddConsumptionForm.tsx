import { css } from "@emotion/react"
import IAccount from "adapters/domains/entities/interfaces/IAccount"
import ICard from "adapters/domains/entities/interfaces/ICard"
import { IRequestTransactionDTOParams } from "adapters/dtos/interfaces/IRequestTransactionDTO"
import ITxnCategoryDTO from "adapters/dtos/interfaces/ITxnCategoryDTO"
import { useState } from "react"
import AddConsumptionAction from "./containers/AddConsumptionAction"

export default function AddConsumptionForm({
  response
}: {
  response?: {
    txnCategories: ITxnCategoryDTO[]
    cards: ICard[]
    accounts: IAccount[]
  }
}) {
  const { txnCategories, cards, accounts } = response || {
    txnCategories: [],
    cards: [],
    accounts: []
  }

  const [transactionData, setTransactionData] =
    useState<IRequestTransactionDTOParams>({
      amount: 0,
      keyword: "",
      categoryId: "",
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
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 1rem;
          p {
            font-size: 0.6rem;
            font-weight: bold;
            text-transform: uppercase;
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
        `}
      >
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
        <div>
          <p>Category</p>
          <select
            name="categoryId"
            value={transactionData.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select a Category</option>
            {txnCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
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
      </div>
      <AddConsumptionAction transactionData={transactionData} />
    </div>
  )
}
