import { CollectionName } from '../common/enums/enums.js';
import { IDbCollection } from '../common/model-types/model-types.js';
import { initRepositories } from './repositories/repositories.js';

const initDatabase = (): ReturnType<typeof initRepositories> => {
  const db: IDbCollection = {
    [CollectionName.USERS]: [],
  };
  const repositories = initRepositories(db);

  return repositories;
};

export { initDatabase };
