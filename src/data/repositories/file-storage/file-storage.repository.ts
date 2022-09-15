import { constants, promises as fs } from 'fs';

interface IFileStorageConstructor {
  filePath: string;
}

class FileStorage {
  #filePath: string;

  constructor({ filePath }: IFileStorageConstructor) {
    this.#filePath = filePath;
  }

  async fileExists(): Promise<void> {
    return fs.access(this.#filePath, constants.F_OK);
  }

  async getAllContent<T>(): Promise<T> {
    await this.fileExists();

    return JSON.parse((await fs.readFile(this.#filePath, 'utf-8')));
  }

  async getItemsByKey<T>(key: string): Promise<T[]> {
    const data = (await this.getAllContent<Record<string, T[]>>() as Record<string, T[]>);

    return data[key];
  }

  async getEntityByKeyAndSearch<T>(key: string, search: Partial<T>): Promise<T | null> {
    const entities = await this.getItemsByKey<T>(key);
    const currentUser = (entities ?? []).find((entity) => {
      return Object.entries(search).every(
        ([searchKey, searchValue]) => entity[searchKey as keyof T] === searchValue,
      );
    });

    return currentUser ?? null;
  }

  async writeItemsByKey<
    T,
  >(key: string, items: T[]): Promise<void> {
    const data = (await this.getAllContent<Record<string, T[]>>() as Record<string, T[]>);
    data[key] = (data[key] ?? []).concat(items);
    this.writeData(data);
  }

  clearItemsByKey(key: string): Promise<void> {
    return this.writeData({ [key]: [] });
  }

  clearAllContent(): Promise<void> {
    return this.writeData({});
  }

  writeData<T>(data: T): Promise<void> {
    return fs.writeFile(this.#filePath, JSON.stringify(data, null, 2));
  }
}

export { FileStorage };
