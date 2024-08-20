import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import ICard from "adapters/domains/entities/interfaces/ICard"

export default interface ICardUseCase {
  getCards(): Promise<ILayerDTO<ICard[]>>
}
