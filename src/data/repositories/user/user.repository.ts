import { IUserDto } from '../../../common/model-types/model-types.js';
import { v4 } from 'uuid';

interface IUserRepositoryConstructor {
  userCollection: IUserDto[];
}

class User {
  #userCollection: IUserDto[];

  constructor({ userCollection }: IUserRepositoryConstructor) {
    this.#userCollection = userCollection;
  }

  async getById(id: string): Promise<IUserDto | null> {
    return this.getOne({ id });
  }

  async getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.findOne(search);
  }

  async findOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    const user = this.#userCollection.find((user) => {
      return Object.entries(search).every(
        ([key, value]) => user[key as keyof IUserDto] === value,
      );
    });

    return new Promise((resolve) => resolve(user ?? null));
  }

  async subscribe({ email }: IUserDto): Promise<IUserDto> {
    const newUser = { id: v4(), email };
    this.#userCollection.push(newUser);

    return newUser;
  }
}

export { User };
