import { v4 } from 'uuid';

import {
  IUserDto,
  ISubscribeUserDto,
} from '../../../common/model-types/model-types.js';

interface IUserRepositoryConstructor {
  userCollection: IUserDto[];
}

class User {
  #userCollection: IUserDto[];

  constructor({ userCollection }: IUserRepositoryConstructor) {
    this.#userCollection = userCollection;
  }

  getAll(): Promise<IUserDto[]> {
    return new Promise((resolve) => resolve(this.#userCollection.slice()));
  }

  getById(id: string): Promise<IUserDto | null> {
    return this.getOne({ id });
  }

  getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.findOne(search);
  }

  findOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    const user = this.#userCollection.find((user) => {
      return Object.entries(search).every(
        ([key, value]) => user[key as keyof IUserDto] === value,
      );
    });

    return new Promise((resolve) => resolve(user ?? null));
  }

  async subscribe({ email }: ISubscribeUserDto): Promise<IUserDto> {
    const newUser = { id: v4(), email };

    this.#userCollection.push(newUser);

    return new Promise((resolve) => resolve(newUser));
  }
}

export { User };
