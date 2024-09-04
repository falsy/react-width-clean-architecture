import IUser from "adapters/domains/entities/interfaces/IUser"

export default interface IUserUseCase {
  getUser(): Promise<IUser>
}
