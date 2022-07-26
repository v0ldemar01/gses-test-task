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
    const existingUser = this.#userRepository.getOne({ email });
    if (!existingUser) {
      await this.#userRepository.subscribe({ email });
    }
  }
}

export { Subscription };
