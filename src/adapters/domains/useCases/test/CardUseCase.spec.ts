import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import ICardUseCase from "../interfaces/ICardUseCase"
import CardUseCase from "../CardUseCase"
import ICardDTO from "adapters/dtos/interfaces/ICardDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import Card from "adapters/domains/entities/Card"

const mockCardDTOs: ICardDTO[] = [
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

describe("CardUseCase", () => {
  let cardUseCase: ICardUseCase
  let cardRepository: ICardRepository

  beforeEach(() => {
    cardRepository = {
      getCards: jest.fn()
    } as ICardRepository

    cardUseCase = new CardUseCase(cardRepository)
  })

  describe("getCards", () => {
    it("should return a list of cards on successful fetch", async () => {
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue({
        isError: false,
        message: "",
        data: mockCardDTOs
      })

      const result = await cardUseCase.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(Card)
      expect(result.data![0].id).toBe("card1")
      expect(result.data![0].cardCompany).toBe("Card1")
      expect(result.data![0].cardType).toBe("CREDIT")
      expect(result.data![0].cardNumber).toBe("4*2*")
    })

    it("should return an error layer when the response has an error", async () => {
      ;(cardRepository.getCards as jest.Mock).mockResolvedValue({
        isError: true,
        message: "An error occurred",
        data: []
      })

      const result = await cardUseCase.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(cardRepository.getCards as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(cardUseCase.getCards()).rejects.toThrow("Unknown error")
    })
  })
})
