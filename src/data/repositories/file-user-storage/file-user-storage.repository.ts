import { IUserDto } from '~/common/model-types/model-types.js';
import { FileStorage } from '../file-storage/file-storage.repository.js';

interface IFileEmailStorageConstructor {
  storage: FileStorage;
}

class FileUserStorage {
  #storage: FileStorage;
  #storageKey = 'users';

  constructor({ storage }: IFileEmailStorageConstructor) {
    this.#storage = storage;
  }

  get storage(): FileStorage {
    return this.#storage;
  }

  get storageKey(): string {
    return this.#storageKey;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getItemsByKey<IUserDto>(this.#storageKey);
  }

  getOne<T>(search: Partial<T>): Promise<T | null> {
    return this.#storage.getEntityByKeyAndSearch(this.#storageKey, search);
  }

  writeOne(user: IUserDto): Promise<void> {
    return this.#storage.writeItemsByKey<IUserDto>(this.#storageKey, [user]);
  }

  writeAll(users: IUserDto[]): Promise<void> {
    return this.#storage.writeItemsByKey<IUserDto>(this.#storageKey, users);
  }

  truncateAll(): Promise<void> {
    return this.#storage.clearAllContent();
  }
}

export { FileUserStorage };
