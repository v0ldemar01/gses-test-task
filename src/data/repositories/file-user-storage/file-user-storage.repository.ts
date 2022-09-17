import { IUserDto } from '~/common/model-types/model-types.js';
import { FileStorage } from '../file-storage/file-storage.repository.js';

interface IFileEmailStorageConstructor {
  storage: FileStorage<IUserDto>;
}

class FileUserStorage {
  #storage: FileStorage<IUserDto>;
  #storageKey = 'users';

  constructor({ storage }: IFileEmailStorageConstructor) {
    this.#storage = storage;
  }

  get storage(): FileStorage<IUserDto> {
    return this.#storage;
  }

  get storageKey(): string {
    return this.#storageKey;
  }

  getAll(): Promise<IUserDto[]> {
    return this.#storage.getItemsByKey(this.#storageKey);
  }

  getOne(search: Partial<IUserDto>): Promise<IUserDto | null> {
    return this.#storage.getEntityByKeyAndSearch(this.#storageKey, search);
  }

  writeOne(user: IUserDto): Promise<void> {
    return this.#storage.writeItemsByKey(this.#storageKey, [user]);
  }

  writeAll(users: IUserDto[]): Promise<void> {
    return this.#storage.writeItemsByKey(this.#storageKey, users);
  }

  truncateAll(): Promise<void> {
    return this.#storage.clearAllContent();
  }
}

export { FileUserStorage };
