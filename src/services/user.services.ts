import UserRepository from '../repository/user.repository';
import { UserModel } from '../interfaces/interfaces';
import { logger } from '../config/logger';

const userRepository = new UserRepository();

export default class UserService {
  constructor() {}

  createUser = async (user: UserModel) => {
    try {
      if (!user) {
        logger.error('User is required');
        throw new Error('User is required');
      }
      let result = await userRepository.createUser(user);
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  createManyUsers = async (users: UserModel[]) => {
    try {
      const newUsers = await userRepository.createManyUsers(users);
      return newUsers;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  getUserById = async (id: string) => {
    try {
      const user = await userRepository.getUserById(id);
      return user;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const user = await userRepository.getByEmail(email);
      return user;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  updateUser = async (id: string, user: UserModel) => {
    try {
      const updatedUser = await userRepository.updateOneUser(id, user);
      return updatedUser;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  deleteUser = async (id: string) => {
    try {
      const deletedUser = await userRepository.deleteOneUser(id);
      return deletedUser;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}
