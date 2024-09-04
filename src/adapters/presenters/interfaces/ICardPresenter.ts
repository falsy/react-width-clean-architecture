import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardPresenter {
  getCards(): Promise<ICard[]>
}
