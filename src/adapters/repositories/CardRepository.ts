import { validateOrReject } from "class-validator"
import { API_URI } from "constants/networks"
import ICardRepository from "./interfaces/ICardRepository"
import CardDTO from "adapters/dtos/CardDTO"
import ICardDTO, { ICardDTOParams } from "adapters/dtos/interfaces/ICardDTO"
import IClientHTTP from "adapters/infrastructures/interfaces/IClientHTTP"

export default class CardRepository implements ICardRepository {
  constructor(private clientHttp: IClientHTTP) {}

  async getCards(): Promise<ICardDTO[]> {
    try {
      const res = await this.clientHttp.get(`${API_URI}/api/cards`)

      if (res.status !== 200) {
        throw new Error("Error occurred while fetching data")
      }

      const cardDTOs = await Promise.all(
        res.data.map(async (card: ICardDTOParams) => {
          const cardDTO = new CardDTO(card)
          await validateOrReject(cardDTO)
          return cardDTO
        })
      )

      return cardDTOs
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }
}
