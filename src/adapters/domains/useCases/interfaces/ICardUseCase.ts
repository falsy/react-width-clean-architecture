import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardUseCase {
  getCards(): Promise<ICard[]>
}
