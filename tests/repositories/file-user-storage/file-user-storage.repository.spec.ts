import { it, jest, describe, expect, beforeEach } from '@jest/globals';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

import { ENV } from '../../../src/configs/configs.js';
import {
  FileStorage,
} from '../../../src/data/repositories/file-storage/file-storage.repository.js';
import {
  FileUserStorage,
} from '../../../src/data/repositories/file-user-storage/file-user-storage.repository.js';

const filePath = resolve(
  dirname(
    fileURLToPath(import.meta.url),
  ),
  '../../../src',
  ENV.APP.STORAGE,
);

const fileContent = { entities: [] };

const fileStorage = new FileStorage({ filePath });
const fileUserStorage = new FileUserStorage({ storage: fileStorage });

describe('FileStorageRepository', () => {
  const fsGetByKeyMock = jest
    .spyOn(fileStorage, 'getItemsByKey')
    .mockImplementation(() => Promise.resolve(fileContent.entities));
  const fsWriteByKeyMock = jest
    .spyOn(fileStorage, 'writeItemsByKey')
    .mockImplementation(() => Promise.resolve());
  const fsClearAllMock = jest
    .spyOn(fileStorage, 'clearAllContent')
    .mockImplementation(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users from storage', async () => {
    const users = await fileUserStorage.getAll();

    expect(users).toEqual([]);
    expect(fsGetByKeyMock).toHaveBeenCalledTimes(1);
    expect(fsGetByKeyMock).toBeCalledWith(fileUserStorage.storageKey);
  });

  it('should write users into storage', async () => {
    const newUsers = Array.from(new Array(4), () => ({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
    }));

    await fileUserStorage.writeAll(newUsers);

    expect(fsWriteByKeyMock).toHaveBeenCalledTimes(1);
    expect(fsWriteByKeyMock).toBeCalledWith(fileUserStorage.storageKey, newUsers);
  });

  it('should write one user into storage', async () => {
    const newUser = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
    };

    await fileUserStorage.writeOne(newUser);

    expect(fsWriteByKeyMock).toHaveBeenCalledTimes(1);
    expect(fsWriteByKeyMock).toBeCalledWith(fileUserStorage.storageKey, [newUser]);
  });

  it('should delete users from storage', async () => {
    await fileUserStorage.truncateAll();

    expect(fsClearAllMock).toHaveBeenCalledTimes(1);
  });
});
