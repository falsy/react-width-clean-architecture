import { validateOrReject } from "class-validator"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import ICardDTO from "adapters/dtos/interfaces/ICardDTO"
import ICardUseCase from "./interfaces/ICardUseCase"
import ICard from "../entities/interfaces/ICard"
import Card from "../entities/Card"

export default class CardUseCase implements ICardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async getCards(): Promise<ILayerDTO<ICard[]>> {
    try {
      const { isError, message, data } = await this.cardRepository.getCards()

      if (isError || !data) {
        return {
          isError,
          message
        }
      }

      const cards = await Promise.all(
        data.map(async (cardDTO: ICardDTO) => {
          const card = new Card({
            id: cardDTO.id,
            cardType: cardDTO.cardType,
            cardCompany: cardDTO.cardCompany,
            cardNumber: cardDTO.cardNumber
          })
          await validateOrReject(card)
          return card
        })
      )

      return new LayerDTO({
        data: cards
      })
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
