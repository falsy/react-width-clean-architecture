export interface IUserInfoDTOParams {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export default interface IUserInfoDTO {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly address: string
}
