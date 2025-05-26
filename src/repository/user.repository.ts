import UserMongo from '../dao/mongo/user.mongo';
import { UserModel } from '../interfaces/interfaces';

const userMongo = new UserMongo();

export default class UserRepository {
  constructor() {}

  async createUser(user: UserModel) {
    try {
      const newUser = await userMongo.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async createManyUsers(users: UserModel[]) {
    try {
      const newUsers = await userMongo.createMany(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

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

  async updateOneUser(id: string, user: UserModel) {
    try {
      const updatedUser = await userMongo.update(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneUser(id: string) {
    try {
      const deletedUser = await userMongo.delete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
