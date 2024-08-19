import CardDTO from "adapters/dtos/CardDTO"
import ICardDTO, { ICardDTOParams } from "adapters/dtos/interfaces/ICardDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"
import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import ICardRepository from "./interfaces/ICardRepository"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default class CardRepository implements ICardRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getCards(): Promise<ILayerDTO<ICardDTO[]>> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/cards`)
      const { isError, message, data } = res.data

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      }

      const cardDTOs = await Promise.all(
        data.map(async (card: ICardDTOParams) => {
          const cardDTO = new CardDTO(card)
          await validateOrReject(cardDTO)
          return cardDTO
        })
      )

      return new LayerDTO({
        data: cardDTOs
      })
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Unknown error type"
      )
      throw error
    }
  }
}
