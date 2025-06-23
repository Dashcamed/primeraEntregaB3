import userModel from './models/user.model';
import { UserModel } from '../../interfaces/interfaces';

export default class UserMongo {
  constructor() {}

  async create(user: UserModel) {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async createMany(users: UserModel[]) {
    try {
      const newUsers = await userModel.insertMany(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  getByEmail = async (email: string) => {
    try {
      const user = await userModel.findOne({ email }).select('+password');
      return user;
    } catch (error) {
      throw error;
    }
  };

  async getById(id: string) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, user: UserModel) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
