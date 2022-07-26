import { ExceptionMessage, HttpCode } from '../../common/enums/enums.js';
import { HttpError } from '../../exceptions/exceptions.js';
import {
  ISubscribeUserRequestDto,
} from '../../common/model-types/model-types.js';
import { User as UserRepository } from '../../data/repositories.js';

interface ISubscriptionServiceConstructor {
  userRepository: UserRepository;
}

class Subscription {
  #userRepository: UserRepository;

  constructor({ userRepository }: ISubscriptionServiceConstructor) {
    this.#userRepository = userRepository;
  }

  async subscribeUser({ email }: ISubscribeUserRequestDto): Promise<void> {
    const existingUser = await this.#userRepository.getOne({ email });
    if (existingUser) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: ExceptionMessage.USER_ALREADY_EXISTS,
      });
    }

    await this.#userRepository.subscribe({ email });
  }
}

export { Subscription };
