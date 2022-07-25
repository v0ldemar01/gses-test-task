/* eslint-disable @typescript-eslint/no-empty-interface */
import { ICurrencyBTCInUAHDTo } from '../../model-types.js';

export interface IGetBTCInUAHResponseDto extends ICurrencyBTCInUAHDTo {}

export interface IGetBTCInUAHFullResponseDto {
  data: [{
    price: IGetBTCInUAHResponseDto;
  }],
}