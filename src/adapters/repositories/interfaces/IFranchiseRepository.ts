import IFranchiseDTO from "adapters/dtos/interfaces/IFranchiseDTO"

export default interface IFranchiseRepository {
  getFranchises(): Promise<IFranchiseDTO[]>
}
