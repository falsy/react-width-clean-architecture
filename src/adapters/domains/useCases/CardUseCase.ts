import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import ICardDTO from "adapters/dtos/interfaces/ICardDTO"
import ICardUseCase from "./interfaces/ICardUseCase"
import ICard from "../entities/interfaces/ICard"
import Card from "../entities/Card"

export default class CardUseCase implements ICardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async getCards(): Promise<ICard[]> {
    const cardDTOs = await this.cardRepository.getCards()
    const cards = cardDTOs.map((cardDTO: ICardDTO) => {
      return new Card(cardDTO)
    })

    return cards
  }
}
