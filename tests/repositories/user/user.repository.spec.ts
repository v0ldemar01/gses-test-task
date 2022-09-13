/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { it, describe, beforeEach, expect } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import {
  User as UserRepository,
} from '../../../src/data/repositories/user/user.repository.js';

describe('UserRepository', () => {
  const mockInitialUsers = [{
    id: v4(),
    email: faker.internet.email(),
  }];
  let userRepository: UserRepository | null = null;

  // beforeEach(() => {
  //   userRepository = new UserRepository({
  //     userCollection: mockInitialUsers,
  //   });
  // });

  it('should return all users', async () => {
    // const users = await userRepository?.getAll();

    // expect(users).toEqual(mockInitialUsers);
  });

  // it('should return user by id', async () => {
  //   const user = await userRepository?.getById(mockInitialUsers[0].id);

  //   expect(user).toEqual(mockInitialUsers[0]);
  // });

  // it('should return user by search', async () => {
  //   const user = await userRepository?.findOne(mockInitialUsers[0]);

  //   expect(user).toEqual(mockInitialUsers[0]);
  // });

  // it('should subscribe user', async () => {
  //   const attemptUserToSubscribe = {
  //     email: faker.internet.email(),
  //   };
  //   const subscribedUser = await userRepository?.subscribe(attemptUserToSubscribe);
  //   const users = await userRepository?.getAll();

  //   expect(subscribedUser?.email).toEqual(attemptUserToSubscribe.email);
  //   expect(users).toEqual(expect.arrayContaining([subscribedUser]));
  // });
});