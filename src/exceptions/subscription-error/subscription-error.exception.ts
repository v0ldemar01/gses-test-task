import { ExceptionMessage, ExceptionName, HttpCode } from '../../common/enums/enums.js';
import { HttpError } from '../exceptions.js';

class SubscriptionError extends HttpError {
  public constructor({
    message = ExceptionMessage.USER_ALREADY_EXISTS,
    status = HttpCode.BAD_REQUEST,
  } = {}) {
    super({
      message,
      status,
      name: ExceptionName.SUBSCRIPTION_ERROR,
    });
  }
}

export { SubscriptionError };
