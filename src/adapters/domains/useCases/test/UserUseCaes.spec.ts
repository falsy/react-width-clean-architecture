import IUserRepository from "adapters/repositories/interfaces/IUserRepository"
import IUserUseCase from "../interfaces/IUserUseCase"
import UserUseCase from "../UserUseCaes"
import LayerDTO from "adapters/dtos/LayerDTO"
import User from "adapters/domains/entities/User"

const mockUserDTO = {
  id: "user1",
  name: "Developer",
  email: "mail@mail.com",
  phone: "",
  address: ""
}

describe("UserUseCase", () => {
  let userUseCase: IUserUseCase
  let userRepository: IUserRepository

  beforeEach(() => {
    userRepository = {
      getUserInfo: jest.fn()
    } as IUserRepository

    userUseCase = new UserUseCase(userRepository)
  })

  describe("getUserInfo", () => {
    it("should return a user on successful fetch", async () => {
      ;(userRepository.getUserInfo as jest.Mock).mockResolvedValue({
        isError: false,
        message: "",
        data: mockUserDTO
      })

      const result = await userUseCase.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toBeInstanceOf(User)
      expect(result.data!.id).toBe("user1")
      expect(result.data!.name).toBe("Developer")
      expect(result.data!.email).toBe("mail@mail.com")
      expect(result.data!.phone).toBe("")
      expect(result.data!.address).toBe("")
    })

    it("should throw an error layer when the response has an error", async () => {
      ;(userRepository.getUserInfo as jest.Mock).mockResolvedValue({
        isError: true,
        message: "An error occurred",
        data: null
      })

      const result = await userUseCase.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(userRepository.getUserInfo as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(userUseCase.getUserInfo()).rejects.toThrow("Unknown error")
    })
  })
})
