import Card from "adapters/domains/entities/Card"
import ICard from "adapters/domains/entities/interfaces/ICard"
import ICardPresenter from "../interfaces/ICardPresenter"
import ICardUseCase from "adapters/domains/useCases/interfaces/ICardUseCase"
import CardPresenter from "../CardPresenter"
import LayerDTO from "adapters/dtos/LayerDTO"

const mockCards: ICard[] = [
  new Card({
    id: "card1",
    cardType: "CREDIT",
    cardCompany: "Card1",
    cardNumber: "4*2*"
  }),
  new Card({
    id: "card2",
    cardType: "CREDIT",
    cardCompany: "Card2",
    cardNumber: "1*3*"
  })
]

describe("CardPresenter", () => {
  let cardPresenter: ICardPresenter
  let cardUseCase: ICardUseCase

  beforeEach(() => {
    cardUseCase = {
      getCards: jest.fn()
    } as unknown as ICardUseCase

    cardPresenter = new CardPresenter(cardUseCase)
  })

  describe("getCards", () => {
    it("should return a list of cards when use case fetch is successful", async () => {
      ;(cardUseCase.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: false,
          message: "",
          data: mockCards
        })
      )

      const result = await cardPresenter.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.data).toHaveLength(2)
      expect(result.data![0]).toBeInstanceOf(Card)
      expect(result.data![0].id).toBe("card1")
      expect(result.data![0].cardType).toBe("CREDIT")
      expect(result.data![0].cardCompany).toBe("Card1")
      expect(result.data![0].cardNumber).toBe("4*2*")
    })

    it("should return an error layer when use case fetch has an error", async () => {
      ;(cardUseCase.getCards as jest.Mock).mockResolvedValue(
        new LayerDTO({
          isError: true,
          message: "An error occurred"
        })
      )

      const result = await cardPresenter.getCards()

      expect(result).toBeInstanceOf(LayerDTO)
      expect(result.isError).toBe(true)
      expect(result.message).toBe("An error occurred")
    })

    it("should throw an error when there is an unknown error", async () => {
      ;(cardUseCase.getCards as jest.Mock).mockRejectedValue(
        new Error("Unknown error")
      )

      await expect(cardPresenter.getCards()).rejects.toThrow("Unknown error")
    })
  })
})
