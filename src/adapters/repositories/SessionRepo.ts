import { ISessionRepository } from './interfaces/iSessionRepo'
import { IHttp } from '../infrastructures/interfaces/iHttp'
import { IStorage } from '../infrastructures/interfaces/iStorage'
import { IUserDTO } from '../dto/UserDTO'

class SessionRepository implements ISessionRepository {

  constructor(
    private readonly http: IHttp,
    private readonly storage: IStorage
  ) {}

  async login(userDTO: IUserDTO): Promise<any> {
    const response = await this.http.request({
      method: 'POST',
      url: 'http://localhost:7777/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id: userDTO.id,
        pw: userDTO.pw
      }
    })

    if(response?.token) return response.token
  }

  getToken() {
    return this.storage.getItem('token')
  }

  setToken(token: string) {
    this.storage.setItem('token', token)
  }

  removeToken() {
    this.storage.removeItem('token')
  }

}

export default SessionRepository