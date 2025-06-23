import { UserModel } from '../interfaces/interfaces';
import UserMongo from '../dao/mongo/user.mongo';

const userMongo = new UserMongo();

export default class UserRepository {
  constructor() {}

  createUser = async (user: UserModel) => {
    try {
      let result = await userMongo.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createManyUsers = async (users: UserModel[]) => {
    try {
      const newUsers = await userMongo.createMany(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  };

  async getAllUsers() {
    try {
      const users = await userMongo.getAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await userMongo.getById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  getByEmail = async (email: string) => {
    try {
      const user = await userMongo.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateOneUser = async (id: string, user: UserModel) => {
    try {
      const updatedUser = await userMongo.update(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  deleteOneUser = async (id: string) => {
    try {
      const deletedUser = await userMongo.delete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  };
}
