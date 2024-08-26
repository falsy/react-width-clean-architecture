import Account from "adapters/domains/entities/Account"
import IAccount from "adapters/domains/entities/interfaces/IAccount"
import IAccountUseCase from "adapters/domains/useCases/interfaces/IAccountUseCase"
import IAccountPresenter from "../interfaces/IAccountPresenter"
import AccountPresenter from "../AccountPresenter"
import LayerDTO from "adapters/dtos/LayerDTO"

const mockAccounts: IAccount[] = [
  new Account({
    id: "account1",
    accountType: "SAVINGS",
    bankName: "Bank1",
    accountNumber: "5*5*",
    balance: 1000
  }),
  new Account({
    id: "account2",
    accountType: "CURRENT",
    bankName: "Bank2",
    accountNumber: "1*5*",
    balance: 2000
  })
]

describe("AccountPresenter", () => {
  let accountPresenter: IAccountPresenter
  let accountUseCase: IAccountUseCase

  beforeEach(() => {
    accountUseCase = {
      getAccounts: jest.fn()
    } as unknown as IAccountUseCase

    accountPresenter = new AccountPresenter(accountUseCase)
  })

  describe("getAccounts", () => {
    it("should return a list of accounts when use case fetch is successful", async () => {
      ;(accountUseCase.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockAccounts
        })
      )

      const result = await accountPresenter.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(Account)
      expect(result.data![0].id).toBe("account1")
      expect(result.data![0].accountType).toBe("SAVINGS")
      expect(result.data![0].bankName).toBe("Bank1")
      expect(result.data![0].accountNumber).toBe("5*5*")
      expect(result.data![0].balance).toBe(1000)
    })

    it("should return an error layer when use case fetch has an error", async () => {
      ;(accountUseCase.getAccounts as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred",
          data: []
        })
      )

      const result = await accountPresenter.getAccounts()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBeTruthy()
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(accountUseCase.getAccounts as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(accountPresenter.getAccounts()).rejects.toThrow(
        "Unknown error"
      )
    })
  })
})
