import AccountUseCase from "../AccountUseCase"
import IAccountUseCase from "../interfaces/IAccountUseCase"
import IAccountRepository from "adapters/repositories/interfaces/IAccountRepository"
import IAccountDTO from "adapters/dtos/interfaces/IAccountDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import Account from "adapters/domains/entities/Account"

const mockAccountDTOs: IAccountDTO[] = [
  {
    id: "account1",
    accountType: "SAVINGS",
    bankName: "Bank1",
    accountNumber: "5*5*",
    balance: 1000
  },
  {
    id: "account2",
    accountType: "CURRENT",
    bankName: "Bank2",
    accountNumber: "1*5*",
    balance: 2000
  }
]

describe("AccountUseCase", () => {
  let accountUseCase: IAccountUseCase
  let accountRepository: IAccountRepository

  beforeEach(() => {
    accountRepository = {
      getAccounts: jest.fn()
    } as unknown as IAccountUseCase

    accountUseCase = new AccountUseCase(accountRepository)
  })

  describe("getAccounts", () => {
    it("should return a list of accounts when repository fetch is successful", async () => {
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccountDTOs
        })
      )

      const result = await accountUseCase.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(Account)
      expect(result.data![0].id).toBe("account1")
      expect(result.data![0].accountType).toBe("SAVINGS")
      expect(result.data![0].bankName).toBe("Bank1")
      expect(result.data![0].accountNumber).toBe("5*5*")
      expect(result.data![0].balance).toBe(1000)
    })

    it("should return an error layer when repository fetch has an error", async () => {
      ;(accountRepository.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred"
        })
      )

      const result = await accountUseCase.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(accountRepository.getAccounts as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(accountUseCase.getAccounts()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
