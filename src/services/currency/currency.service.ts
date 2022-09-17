import { CurrencyProvider } from '../../common/enums/enums.js';
import { Http as HttpService } from '../http/http.service.js';
import { BinanceCurrency } from './binance-currency.service.js';
import { CoinbaseCurrency } from './coinbase-currency.service.js';
import { CryptocompareCurrency } from './cryptocompare-currency.service.js';
import { getCurrencyServiceByProvider } from './helpers/helpers.js';
import { AbstractCurrency } from './abstract-currency.service.js';
import { ProxyCurrency } from './proxy-currency.service.js';

const initCurrencyServices = ({
  http,
  provider,
  cachingTime,
}: {
  http: HttpService;
  provider: CurrencyProvider;
  cachingTime: number;
}): AbstractCurrency => {
  const binanceCurrency = new BinanceCurrency({
    http,
  });

  const coinbaseCurrency = new CoinbaseCurrency({
    http,
  });

  const cryptocompareCurrency = new CryptocompareCurrency({
    http,
  });

  const currentCurrencyService = getCurrencyServiceByProvider({
    binanceCurrency,
    coinbaseCurrency,
    cryptocompareCurrency,
  }, provider);

  const proxyCurrencyService = new ProxyCurrency({
    currencyService: currentCurrencyService,
    cachingTime,
  });

  return proxyCurrencyService;
};

export { initCurrencyServices };