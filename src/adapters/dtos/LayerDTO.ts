import { IsBoolean, IsOptional, IsString } from "class-validator"
import ILayerDTO from "./interfaces/ILayerDTO"

export default class LayerDTO<T> implements ILayerDTO<T> {
  @IsBoolean()
  readonly isError: boolean

  @IsString()
  readonly message: string

  @IsOptional()
  readonly data?: T

  @IsOptional()
  @IsString()
  readonly errorCode?: string

  constructor({
    isError = false,
    message = "success",
    data,
    errorCode
  }: {
    isError?: boolean
    message?: string
    data?: T
    errorCode?: string
  } = {}) {
    this.isError = isError
    this.message = message
    this.data = data
    this.errorCode = errorCode
  }
}
