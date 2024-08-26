import AccountTransaction from "adapters/domains/aggregates/AccountTransaction"
import CardTransaction from "adapters/domains/aggregates/CardTransaction"
import Transaction from "adapters/domains/aggregates/entities/Transaction"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import Account from "adapters/domains/entities/Account"
import Card from "adapters/domains/entities/Card"
import TxnCategoryVO from "adapters/domains/vos/TxnCateogryVO"
import ITransactionPresenter from "../interfaces/ITransactionPresenter"
import ITransactionUseCase from "adapters/domains/useCases/interfaces/ITransactionUseCase"
import TransactionPresenter from "../TransactionPresenter"
import LayerDTO from "adapters/dtos/LayerDTO"
import CardTransactionVM from "adapters/vms/CardTransactionVM"
import AccountTransactionVM from "adapters/vms/AccountTransactionVM"

const mockTransactions: Array<ICardTransaction | IAccountTransaction> = [
  new CardTransaction({
    transaction: new Transaction({
      id: "txn1",
      amount: 1000,
      keyword: "Store1",
      category: new TxnCategoryVO({
        id: "category1",
        name: "category1",
        description: "Food and beverage"
      }),
      createdAt: "2024-01-01 00:00:00"
    }),
    card: new Card({
      id: "card1",
      cardType: "CREDIT",
      cardCompany: "Card1",
      cardNumber: "4*2*"
    })
  }),
  new AccountTransaction({
    transaction: new Transaction({
      id: "txn2",
      amount: 2000,
      keyword: "Store2",
      category: new TxnCategoryVO({
        id: "category1",
        name: "category1",
        description: "Food and beverage"
      }),
      createdAt: "2024-01-02 00:00:00"
    }),
    account: new Account({
      id: "account1",
      accountType: "SAVINGS",
      bankName: "Bank1",
      accountNumber: "1*2*",
      balance: 1000
    })
  })
]

const mockReqeurstTransactionData = {
  id: "txn3",
  amount: 3000,
  keyword: "Store3",
  categoryId: "category2",
  cardId: "card3",
  createdAt: "2024-01-03 00:00:00"
}

describe("TransactionPresenter", () => {
  let transactionPresenter: ITransactionPresenter
  let transactionUseCase: ITransactionUseCase

  beforeEach(() => {
    transactionUseCase = {
      getTransactions: jest.fn(),
      addTransaction: jest.fn(),
      getTxnCategories: jest.fn()
    } as ITransactionUseCase

    transactionPresenter = new TransactionPresenter(transactionUseCase)
  })

  describe("getTransactions", () => {
    it("should return a list of transactions when use case fetch is successful", async () => {
      ;(transactionUseCase.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "success",
          data: mockTransactions
        })
      )

      const result = await transactionPresenter.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(CardTransactionVM)
      expect(result.data![1]).toBeInstanceOf(AccountTransactionVM)
      expect(result.data![0].id).toBe("txn1")
      expect(result.data![0].amount).toBe(1000)
      expect(result.data![0].keyword).toBe("Store1")
      expect(result.data![0].createdAt).toBe("2024-01-01 00:00:00")
      expect(result.data![0].category.id).toBe("category1")
      expect(result.data![0].category.name).toBe("category1")
      expect(result.data![0].category.description).toBe("Food and beverage")
      expect((result.data![0] as CardTransactionVM).cardId).toBe("card1")
      expect((result.data![0] as CardTransactionVM).card.cardType).toBe(
        "CREDIT"
      )
      expect((result.data![0] as CardTransactionVM).card.cardCompany).toBe(
        "Card1"
      )
      expect((result.data![0] as CardTransactionVM).card.cardNumber).toBe(
        "4*2*"
      )
      expect(result.data![1].id).toBe("txn2")
      expect(result.data![1].amount).toBe(2000)
      expect(result.data![1].keyword).toBe("Store2")
      expect(result.data![1].createdAt).toBe("2024-01-02 00:00:00")
      expect(result.data![1].category.id).toBe("category1")
      expect(result.data![1].category.name).toBe("category1")
      expect(result.data![1].category.description).toBe("Food and beverage")
      expect((result.data![1] as AccountTransactionVM).accountId).toBe(
        "account1"
      )
      expect(
        (result.data![1] as AccountTransactionVM).account.accountType
      ).toBe("SAVINGS")
      expect((result.data![1] as AccountTransactionVM).account.bankName).toBe(
        "Bank1"
      )
      expect(
        (result.data![1] as AccountTransactionVM).account.accountNumber
      ).toBe("1*2*")
      expect((result.data![1] as AccountTransactionVM).account.balance).toBe(
        1000
      )
    })

    it("should return an error layer when use case fetch has an error", async () => {
      ;(transactionUseCase.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred"
        })
      )

      const result = await transactionPresenter.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should return an error layer when use case fetch has an error", async () => {
      ;(transactionUseCase.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "Unknown error"
        })
      )

      const result = await transactionPresenter.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("Unknown error")
    })
  })

  describe("addTransaction", () => {
    it("should return a success layer on successful fetch", async () => {
      ;(transactionUseCase.addTransaction as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "success",
          data: true
        })
      )

      const result = await transactionPresenter.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(false)
      expect(result.message).toBe("success")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(transactionUseCase.addTransaction as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: null
        })
      )

      const result = await transactionPresenter.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(transactionUseCase.addTransaction as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(
        transactionPresenter.addTransaction(mockReqeurstTransactionData)
      ).rejects.toThrow("Unknown error")
    })
  })

  describe("getTxnCategories", () => {
    it("should return a list of categories on successful fetch", async () => {
      ;(transactionUseCase.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "success",
          data: [
            new TxnCategoryVO({
              id: "category1",
              name: "category1",
              description: "Food and beverage"
            }),
            new TxnCategoryVO({
              id: "category2",
              name: "category2",
              description: "Transportation"
            })
          ]
        })
      )

      const result = await transactionPresenter.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(TxnCategoryVO)
      expect(result.data![0].id).toBe("category1")
      expect(result.data![0].name).toBe("category1")
      expect(result.data![0].description).toBe("Food and beverage")
      expect(result.data![1]).toBeInstanceOf(TxnCategoryVO)
      expect(result.data![1].id).toBe("category2")
      expect(result.data![1].name).toBe("category2")
      expect(result.data![1].description).toBe("Transportation")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(transactionUseCase.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred"
        })
      )

      const result = await transactionPresenter.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(transactionUseCase.getTxnCategories as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(transactionPresenter.getTxnCategories()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
