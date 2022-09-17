import { CurrencyProvider } from '../../common/enums/enums.js';
import { Http as HttpService } from '../http/http.service.js';
import { BinanceCurrency } from './binance-currency.service.js';
import { CoinbaseCurrency } from './coinbase-currency.service.js';
import { CryptocompareCurrency } from './cryptocompare-currency.service.js';
import { CurrencyServices } from './types.js';
import { getCurrencyServiceByProvider } from './helpers/helpers.js';

const initCurrencyServices = ({
  http,
  provider,
}: {
  http: HttpService;
  provider: CurrencyProvider;
}): CurrencyServices[keyof CurrencyServices] => {
  const binanceCurrency = new BinanceCurrency({
    http,
  });

  const coinbaseCurrency = new CoinbaseCurrency({
    http,
  });

  const cryptocompareCurrency = new CryptocompareCurrency({
    http,
  });

  const currentService = getCurrencyServiceByProvider({
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  }, provider);

  return currentService;
};

export { initCurrencyServices };