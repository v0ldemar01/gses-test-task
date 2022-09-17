import { Currency } from '~/common/enums/enums.js';
import { IGetRateAbstractResponseDto } from '~/common/model-types/model-types.js';
import { Http as HttpServive } from '../services.js';

interface IAbstractCurrencyConstructor {
  http: HttpServive;
}

abstract class AbstractCurrency {
  #http: HttpServive;

  constructor({ http }: IAbstractCurrencyConstructor) {
    this.#http = http;
  }

  get http(): HttpServive {
    return this.#http;
  }

  getRate(_: Record<'from' | 'to', Currency>): Promise<IGetRateAbstractResponseDto> {
    return Promise.resolve(0);
  }
}

export { AbstractCurrency };
