import ICard from "adapters/domains/entities/interfaces/ICard"
import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"

export default interface ICardPresenter {
  getCards(): Promise<ILayerDTO<ICard[]>>
}
