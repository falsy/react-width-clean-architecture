import IUserDTO from "adapters/dtos/interfaces/IUserDTO"

export default interface IUserRepository {
  getUser(): Promise<IUserDTO>
}
