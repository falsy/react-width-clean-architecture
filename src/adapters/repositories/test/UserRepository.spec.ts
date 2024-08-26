import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import UserRepository from "../UserRepository"
import IUserRepository from "../interfaces/IUserRepository"
import { validateOrReject } from "class-validator"
import UserInfoDTO from "adapters/dtos/UserInfoDTO"
import LayerDTO from "adapters/dtos/LayerDTO"

jest.mock("class-validator")

const mockUserData = {
  id: "user1",
  name: "Developer",
  email: "mail@mail.com",
  phone: "",
  address: ""
}

describe("UserRepository", () => {
  let userRepository: IUserRepository
  let clientHttp: IClientHTTP

  beforeEach(() => {
    clientHttp = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as IClientHTTP

    userRepository = new UserRepository(clientHttp)
  })

  describe("getUserInfo", () => {
    it("should return a user on successful fetch", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: mockUserData
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await userRepository.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toBeInstanceOf(UserInfoDTO)
      expect(result.data!.id).toBe("user1")
      expect(result.data!.name).toBe("Developer")
      expect(result.data!.email).toBe("mail@mail.com")
      expect(result.data!.phone).toBe("")
      expect(result.data!.address).toBe("")
    })

    it("should throw an error layer when the response has an error", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: null
        }
      })

      const result = await userRepository.getUserInfo()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.get as jest.Mock).mockRejectedValue(
        new Error("An unknown error occurred")
      )

      await expect(userRepository.getUserInfo()).rejects.toThrow(
        "An unknown error occurred"
      )
    })
  })
})
