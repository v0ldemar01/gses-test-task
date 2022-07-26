import { CollectionName } from '../../common/enums/enums.js';
import { IDbCollection } from '../../common/model-types/model-types.js';
import { User } from './user/user.repository.js';

interface IInitRepositoriesReturn {
  user: User;
}

const initRepositories = (db: IDbCollection): IInitRepositoriesReturn => {
  const user = new User({
    userCollection: db[CollectionName.USERS],
  });

  return { user };
};

export { initRepositories, type User };
