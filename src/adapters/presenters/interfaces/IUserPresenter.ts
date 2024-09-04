import IUser from "adapters/domains/entities/interfaces/IUser"

export default interface IUserPresenter {
  getUser(): Promise<IUser>
}
