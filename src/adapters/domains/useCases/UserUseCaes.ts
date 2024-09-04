import IUserRepository from "adapters/repositories/interfaces/IUserRepository"
import IUserUseCase from "./interfaces/IUserUseCase"
import IUser from "../entities/interfaces/IUser"
import User from "../entities/User"

class UserUseCase implements IUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async getUser(): Promise<IUser> {
    const userDTO = await this.userRepository.getUser()
    const user = new User(userDTO)

    return user
  }
}

export default UserUseCase
