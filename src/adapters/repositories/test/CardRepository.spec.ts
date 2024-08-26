import { validateOrReject } from "class-validator"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import CardRepository from "../CardRepository"
import LayerDTO from "adapters/dtos/LayerDTO"
import CardDTO from "adapters/dtos/CardDTO"
import ICardRepository from "../interfaces/ICardRepository"

jest.mock("class-validator")

const mockCardData = [
  {
    id: "card1",
    cardType: "CREDIT",
    cardCompany: "Card1",
    cardNumber: "4*2*"
  },
  {
    id: "card2",
    cardType: "CREDIT",
    cardCompany: "Card2",
    cardNumber: "1*3*"
  }
]

describe("CardRepository", () => {
  let cardRepository: ICardRepository
  let clientHttp: IClientHTTP

  beforeEach(() => {
    clientHttp = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    } as IClientHTTP

    cardRepository = new CardRepository(clientHttp)
  })

  describe("getCards", () => {
    it("should return a list of cards on successful fetch", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: false,
          message: "",
          data: mockCardData
        }
      })
      ;(validateOrReject as jest.Mock).mockResolvedValue(true)

      const result = await cardRepository.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(CardDTO)
      expect(result.data![0].id).toBe("card1")
      expect(result.data![0].cardCompany).toBe("Card1")
      expect(result.data![0].cardType).toBe("CREDIT")
      expect(result.data![0].cardNumber).toBe("4*2*")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(clientHttp.get as jest.Mock).mockResolvedValue({
        data: {
          isError: true,
          message: "An error occurred",
          data: []
        }
      })

      const result = await cardRepository.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(clientHttp.get as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(cardRepository.getCards()).rejects.toThrow("Unknown error")
    })
  })
})
