import { CurrencyProvider } from '../../../../common/enums/enums.js';
import { CurrencyServices } from '../../types.js';

const getCurrencyServiceByProvider = (
  currencyServices: CurrencyServices,
  provider: CurrencyProvider,
): CurrencyServices[keyof CurrencyServices] => {
  const currencyDictionary: Record<CurrencyProvider, CurrencyServices[keyof CurrencyServices]> = {
    [CurrencyProvider.BINANCE]: currencyServices.binanceCurrency,
    [CurrencyProvider.COINBASE]: currencyServices.coinbaseCurrency,
    [CurrencyProvider.CRYPTOCOMPARE]: currencyServices.coinbaseCurrency,
  };

  return currencyDictionary[provider] ?? currencyDictionary[CurrencyProvider.BINANCE];
};

export { getCurrencyServiceByProvider };