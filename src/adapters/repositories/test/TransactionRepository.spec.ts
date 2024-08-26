import { validateOrReject } from "class-validator"
import TransactionRepository from "../TransactionRepository"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import ITransactionRepository from "../interfaces/ITransactionRepository"
import LayerDTO from "adapters/dtos/LayerDTO"
import TransactionDTO from "adapters/dtos/TransactionDTO"
import TxnCategoryDTO from "adapters/dtos/TxnCategoryDTO"

jest.mock("class-validator")

const mockTransactionData = [
  {
    id: "txn1",
    amount: 1000,
    keyword: "Store1",
    categoryId: "category1",
    cardId: "card1",
    createdAt: "2024-01-01 00:00:00"
  },
  {
    id: "txn2",
    amount: 2000,
    keyword: "Store2",
    categoryId: "category1",
    cardId: "card2",
    createdAt: "2024-01-02 00:00:00"
  }
]

const mockReqeurstTransactionData = {
  id: "txn3",
  amount: 3000,
  keyword: "Store3",
  categoryId: "category2",
  cardId: "card3",
  createdAt: "2024-01-03 00:00:00"
}

const mockTxnCateoryData = [
  {
    id: "category1",
    name: "category1",
    description: "Food and beverage"
  },
  {
    id: "category2",
    name: "category2",
    description: "Withdraw money from account"
  }
]

describe("TransactionRepository", () => {
  let transactionRepository: ITransactionRepository
  let clientHttp: IClientHTTP

  beforeEach(() => {
    clientHttp = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as IClientHTTP

    transactionRepository = new TransactionRepository(clientHttp)
  })

  describe("getTransactions", () => {
    it("should return a list of transactions on successful fetch", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: mockTransactionData
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await transactionRepository.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(TransactionDTO)
      expect(result.data![0].id).toBe("txn1")
      expect(result.data![0].amount).toBe(1000)
      expect(result.data![0].keyword).toBe("Store1")
      expect(result.data![0].categoryId).toBe("category1")
      expect(result.data![0].cardId).toBe("card1")
      expect(result.data![0].createdAt).toBe("2024-01-01 00:00:00")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: []
        }
      })

      const result = await transactionRepository.getTransactions()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.get as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(transactionRepository.getTransactions()).rejects.toThrow(
        "Unknown error"
      )
    })
  })

  describe("addTransaction", () => {
    it("should return a success layer on successful fetch", async () => {
      ;(clientHttp.post as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: true
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await transactionRepository.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toBe(true)
    })

    it("should return an error layer when the response has an error", async () => {
      ;(clientHttp.post as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: false
        }
      })

      const result = await transactionRepository.addTransaction(
        mockReqeurstTransactionData
      )

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.post as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(
        transactionRepository.addTransaction(mockReqeurstTransactionData)
      ).rejects.toThrow("Unknown error")
    })
  })

  describe("getTransactionCategories", () => {
    it("should return a list of categories on successful fetch", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: mockTxnCateoryData
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await transactionRepository.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(TxnCategoryDTO)
      expect(result.data![0].id).toBe("category1")
      expect(result.data![0].name).toBe("category1")
      expect(result.data![0].description).toBe("Food and beverage")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: []
        }
      })

      const result = await transactionRepository.getTxnCategories()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.get as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(transactionRepository.getTxnCategories()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
