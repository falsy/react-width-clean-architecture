import ICardDTO from "adapters/dtos/interfaces/ICardDTO"

export default interface ICardRepository {
  getCards(): Promise<ICardDTO[]>
}
