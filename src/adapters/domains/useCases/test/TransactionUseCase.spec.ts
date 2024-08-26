import AccountDTO from "adapters/dtos/AccountDTO"
import CardDTO from "adapters/dtos/CardDTO"
import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import ITxnCategoryDTO from "adapters/dtos/interfaces/ITxnCategoryDTO"
import TransactionDTO from "adapters/dtos/TransactionDTO"
import TxnCategoryDTO from "adapters/dtos/TxnCategoryDTO"
import ITransactionUseCase from "../interfaces/ITransactionUseCase"
import ITransactionRepository from "adapters/repositories/interfaces/ITransactionRepository"
import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import IAccountRepository from "adapters/repositories/interfaces/IAccountRepository"
import TransactionUseCase from "../TransactionUseCase"
import LayerDTO from "adapters/dtos/LayerDTO"
import CardTransaction from "adapters/domains/aggregates/CardTransaction"
import AccountTransaction from "adapters/domains/aggregates/AccountTransaction"
import ICardTransaction from "adapters/domains/aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "adapters/domains/aggregates/interfaces/IAccountTransaction"

const mockTransactionDTOs: ITransactionDTO[] = [
  new TransactionDTO({
    id: "txn1",
    amount: 1000,
    keyword: "Store1",
    categoryId: "category1",
    cardId: "card1",
    createdAt: "2024-01-01 00:00:00"
  }),
  new TransactionDTO({
    id: "txn2",
    amount: 2000,
    keyword: "Store2",
    categoryId: "category1",
    accountId: "account1",
    createdAt: "2024-01-02 00:00:00"
  })
]

const mockTxnCateoryDTOs: ITxnCategoryDTO[] = [
  new TxnCategoryDTO({
    id: "category1",
    name: "category1",
    description: "Food and beverage"
  }),
  new TxnCategoryDTO({
    id: "category2",
    name: "category2",
    description: "Withdraw money from account"
  })
]

const mockCardDTOs = [
  new CardDTO({
    id: "card1",
    cardType: "CREDIT",
    cardCompany: "Card1",
    cardNumber: "4*2*"
  }),
  new CardDTO({
    id: "card2",
    cardType: "CREDIT",
    cardCompany: "Card2",
    cardNumber: "1*3*"
  })
]

const mockAccountDTOs = [
  new AccountDTO({
    id: "account1",
    accountType: "SAVINGS",
    bankName: "Bank1",
    accountNumber: "1*2*",
    balance: 1000
  }),
  new AccountDTO({
    id: "account2",
    accountType: "CURRENT",
    bankName: "Bank2",
    accountNumber: "2*3*",
    balance: 2000
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

describe("TransactionUseCase", () => {
  let transactionUseCase: ITransactionUseCase
  let transactionRepository: ITransactionRepository
  let cardRepository: ICardRepository
  let accountRepository: IAccountRepository

  beforeEach(() => {
    transactionRepository = {
      getTransactions: jest.fn(),
      getTxnCategories: jest.fn(),
      addTransaction: jest.fn()
    } as ITransactionRepository

    cardRepository = {
      getCards: jest.fn()
    } as ICardRepository

    accountRepository = {
      getAccounts: jest.fn()
    } as IAccountRepository

    transactionUseCase = new TransactionUseCase(
      transactionRepository,
      cardRepository,
      accountRepository
    )
  })

  describe("getTransactions", () => {
    it("should return a list of transactions on successful fetch", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTransactionDTOs
        })
      )
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTxnCateoryDTOs
        })
      )
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockCardDTOs
        })
      )
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccountDTOs
        })
      )

      const result = await transactionUseCase.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(CardTransaction)
      expect(result.data![1]).toBeInstanceOf(AccountTransaction)
      expect(result.data![0].transaction.id).toBe("txn1")
      expect(result.data![0].transaction.amount).toBe(1000)
      expect(result.data![0].transaction.keyword).toBe("Store1")
      expect(result.data![0].transaction.category.name).toBe("category1")
      expect((result.data![0] as ICardTransaction).cardId).toBe("card1")
      expect((result.data![1] as IAccountTransaction).accountId).toBe(
        "account1"
      )
      expect(result.data![0].transaction.createdAt).toBe("2024-01-01 00:00:00")
    })

    it("should return an error layer when the response has an error(transactions)", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTxnCateoryDTOs
        })
      )
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockCardDTOs
        })
      )
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccountDTOs
        })
      )

      const result = await transactionUseCase.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("Error occurred while fetching data")
    })

    it("should return an error layer when the response has an error(categories)", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTransactionDTOs
        })
      )
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockCardDTOs
        })
      )
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccountDTOs
        })
      )

      const result = await transactionUseCase.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("Error occurred while fetching data")
    })

    it("should return an error layer when the response has an error(cards)", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTransactionDTOs
        })
      )
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTxnCateoryDTOs
        })
      )
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccountDTOs
        })
      )

      const result = await transactionUseCase.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("Error occurred while fetching data")
    })

    it("should return an error layer when the response has an error(accounts)", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTransactionDTOs
        })
      )
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTxnCateoryDTOs
        })
      )
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockCardDTOs
        })
      )
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )

      const result = await transactionUseCase.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("Error occurred while fetching data")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(transactionRepository.getTransactions as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(transactionUseCase.getTransactions()).rejects.toThrow(
        "Unknown error"
      )
    })
  })

  describe("addTransaction", () => {
    it("should return a success layer on successful fetch", async () => {
      ;(transactionRepository.addTransaction as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: true
        })
      )

      const result = await transactionUseCase.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(false)
      expect(result.message).toBe("")
      expect(result.data).toBe(true)
    })

    it("should return an error layer when the response has an error", async () => {
      ;(transactionRepository.addTransaction as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: null
        })
      )

      const result = await transactionUseCase.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(transactionRepository.addTransaction as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(
        transactionUseCase.addTransaction(mockReqeurstTransactionData)
      ).rejects.toThrow("Unknown error")
    })
  })

  describe("getTxnCategories", () => {
    it("should return a list of categories on successful fetch", async () => {
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockTxnCateoryDTOs
        })
      )

      const result = await transactionUseCase.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(TxnCategoryDTO)
      expect(result.data![0].id).toBe("category1")
      expect(result.data![0].name).toBe("category1")
      expect(result.data![0].description).toBe("Food and beverage")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(transactionRepository.getTxnCategories as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )

      const result = await transactionUseCase.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(transactionRepository.getTxnCategories as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(transactionUseCase.getTxnCategories()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
