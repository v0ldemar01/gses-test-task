import { constants, promises as fs } from 'fs';

interface IFileStorageConstructor {
  filePath: string;
}

class FileStorage<T extends Record<string, unknown>> {
  #filePath: string;

  constructor({ filePath }: IFileStorageConstructor) {
    this.#filePath = filePath;
  }

  async fileExists(): Promise<void> {
    return fs.access(this.#filePath, constants.F_OK);
  }

  async getAllContent<K>(): Promise<K> {
    await this.fileExists();

    return JSON.parse((await fs.readFile(this.#filePath, 'utf-8')));
  }

  async getItemsByKey(key: string): Promise<T[]> {
    const data = (await this.getAllContent<Record<string, T[]>>() as Record<string, T[]>);

    return data[key];
  }

  async getEntityByKeyAndSearch(key: string, search: Partial<T>): Promise<T | null> {
    const entities = await this.getItemsByKey(key);
    const currentUser = (entities ?? []).find((entity) => {
      return Object.entries(search).every(
        ([searchKey, searchValue]) => entity[searchKey] === searchValue,
      );
    });

    return (currentUser as T) ?? null;
  }

  async writeItemsByKey(key: string, items: T[]): Promise<void> {
    const data = (await this.getAllContent<Record<string, T[]>>());
    data[key] = (data[key] ?? []).concat(items);
    this.writeData(data);
  }

  clearItemsByKey(key: string): Promise<void> {
    return this.writeData({ [key]: [] });
  }

  clearAllContent(): Promise<void> {
    return this.writeData({});
  }

  writeData(data: Record<string, T[]>): Promise<void> {
    return fs.writeFile(this.#filePath, JSON.stringify(data, null, 2));
  }
}

export { FileStorage };
