import IUser from "adapters/domains/entities/interfaces/IUser"
import User from "adapters/domains/entities/User"
import IUserPresenter from "../interfaces/IUserPresenter"
import IUserUseCase from "adapters/domains/useCases/interfaces/IUserUseCase"
import UserPresenter from "../UserPresenter"
import LayerDTO from "adapters/dtos/LayerDTO"

const mockUser: IUser = new User({
  id: "user1",
  name: "Developer",
  email: "mail@mail.com",
  phone: "",
  address: ""
})

describe("UserPresenter", () => {
  let userPresenter: IUserPresenter
  let userUseCase: IUserUseCase

  beforeEach(() => {
    userUseCase = {
      getUserInfo: jest.fn()
    } as IUserUseCase

    userPresenter = new UserPresenter(userUseCase)
  })

  describe("getUserInfo", () => {
    it("should return a user on successful fetch", async () => {
      ;(userUseCase.getUserInfo as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockUser
        })
      )

      const result = await userPresenter.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toBeInstanceOf(User)
      expect(result.data!.id).toBe("user1")
      expect(result.data!.name).toBe("Developer")
      expect(result.data!.email).toBe("mail@mail.com")
      expect(result.data!.phone).toBe("")
      expect(result.data!.address).toBe("")
    })

    it("should throw an error layer when the response has an error", async () => {
      ;(userUseCase.getUserInfo as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred"
        })
      )

      const result = await userPresenter.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(userUseCase.getUserInfo as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(userPresenter.getUserInfo()).rejects.toThrow("Unknown error")
    })
  })
})
