import { it, jest, describe, expect, beforeEach } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

import { IUserDto } from '../../../src/common/model-types/model-types.js';
import { ENV } from '../../../src/configs/configs.js';
import {
  FileStorage,
} from '../../../src/data/repositories/file-storage/file-storage.repository.js';
import {
  FileUserStorage,
} from '../../../src/data/repositories/file-user-storage/file-user-storage.repository.js';
import {
  User as UserRepository,
} from '../../../src/data/repositories/user/user.repository.js';

const filePath = resolve(
  dirname(
    fileURLToPath(import.meta.url),
  ),
  '../../../src',
  ENV.APP.STORAGE,
);

const fileContent = {
  users: [{
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
  }],
};

const fileStorage = new FileStorage({ filePath });
const fileUserStorage = new FileUserStorage({ storage: fileStorage });
const userRepository = new UserRepository({
  storage: fileUserStorage,
});

describe('UserRepository', () => {
  const fsUserGetAllMock = jest
    .spyOn(fileUserStorage, 'getAll')
    .mockImplementation(() => Promise.resolve(fileContent.users));
  const fsUserGetOneMock = jest
    .spyOn(fileUserStorage, 'getOne')
    .mockImplementation((user: Partial<IUserDto>) => Promise.resolve(user));
  const fsUserWriteOneMock = jest
    .spyOn(fileUserStorage, 'writeOne')
    .mockImplementation((newUser) => {
      fileContent.users.push(newUser);
      return Promise.resolve();
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = await userRepository.getAll();

    expect(users).toEqual(fileContent.users);
    expect(fsUserGetAllMock).toHaveBeenCalledTimes(1);
  });

  it('should return user by id', async () => {
    const user = await userRepository.getById(fileContent.users[0].id);

    expect(user).toEqual(expect.objectContaining({
      id: fileContent.users[0].id,
    }));
    expect(fsUserGetOneMock).toHaveBeenCalledTimes(1);
    expect(fsUserGetOneMock).toBeCalledWith({
      id: fileContent.users[0].id,
    });
  });

  it('should return user by email', async () => {
    const user = await userRepository.getOne({
      email: fileContent.users[0].email,
    });

    expect(user).toEqual(expect.objectContaining({
      email: fileContent.users[0].email,
    }));
    expect(fsUserGetOneMock).toHaveBeenCalledTimes(1);
    expect(fsUserGetOneMock).toBeCalledWith({
      email: fileContent.users[0].email,
    });
  });

  it('should find correct user by search', async () => {
     const user = await userRepository.getOne(fileContent.users[0]);

    expect(user).toEqual(fileContent.users[0]);
    expect(fsUserGetOneMock).toHaveBeenCalledTimes(1);
    expect(fsUserGetOneMock).toBeCalledWith(fileContent.users[0]);
  });

  it('should subscribe user', async () => {
    const attemptUserToSubscribe = {
      email: faker.internet.email(),
    };
    const user = await userRepository.subscribe(attemptUserToSubscribe);
    const users = await userRepository.getAll();

    expect(user?.email).toEqual(attemptUserToSubscribe.email);
    expect(users).toEqual(expect.arrayContaining([user]));
    expect(fsUserWriteOneMock).toHaveBeenCalledTimes(1);
    expect(fsUserWriteOneMock).toBeCalledWith(
      expect.objectContaining(attemptUserToSubscribe),
    );
  });
});