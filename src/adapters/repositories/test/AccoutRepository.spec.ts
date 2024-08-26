import { validateOrReject } from "class-validator"
import LayerDTO from "adapters/dtos/LayerDTO"
import AccountDTO from "adapters/dtos/AccountDTO"
import AccountRepository from "../AccountRepository"
import IAccountRepository from "../interfaces/IAccountRepository"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"

jest.mock("class-validator")

const mockAccountData = [
  {
    id: "account1",
    accountType: "SAVINGS",
    bankName: "Bank1",
    accountNumber: "1*2*",
    balance: 1000
  },
  {
    id: "account2",
    accountType: "CURRENT",
    bankName: "Bank2",
    accountNumber: "2*3*",
    balance: 2000
  }
]

describe("AccountRepository", () => {
  let accountRepository: IAccountRepository
  let clientHttp: IClientHTTP

  beforeEach(() => {
    clientHttp = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as IClientHTTP

    accountRepository = new AccountRepository(clientHttp)
  })

  describe("getAccounts", () => {
    it("should return a list of accounts on successful fetch", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: mockAccountData
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await accountRepository.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(AccountDTO)
      expect(result.data![0].id).toBe("account1")
      expect(result.data![0].bankName).toBe("Bank1")
      expect(result.data![0].accountType).toBe("SAVINGS")
      expect(result.data![0].accountNumber).toBe("1*2*")
      expect(result.data![0].balance).toBe(1000)
    })

    it("should return an error layer when the response has an error", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: null
        }
      })

      const result = await accountRepository.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.get as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(accountRepository.getAccounts()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
