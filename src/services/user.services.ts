import UserRepository from '../repository/user.repository';
import { UserModel } from '../interfaces/interfaces';

const userRepository = new UserRepository();

export default class UserService {
  constructor() {}

  async createUser(user: UserModel) {
    try {
      const newUser = await userRepository.createUser(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async createManyUsers(users: UserModel[]) {
    try {
      const newUsers = await userRepository.createManyUsers(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: UserModel) {
    try {
      const updatedUser = await userRepository.updateOneUser(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await userRepository.deleteOneUser(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
