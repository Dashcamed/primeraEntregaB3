import UserService from './user.services';
import type { UserModel } from '../interfaces/interfaces';
import { isValidPassword } from '../utils/utils';
import moment from 'moment';
const userService = new UserService();

export default class SessionServices {
  constructor() {}

  registerUser = async (user: UserModel) => {
    try {
      const { first_name, last_name, email, password } = user;
      if (!first_name || !last_name || !email || !password) {
        throw new Error('Rellena todos los campos');
      }
      const result = await userService.createUser(user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  login = async (user: UserModel) => {
    try {
      const { email, password } = user;
      if (!email || !password) {
        throw new Error('Faltan datos');
      }
      const result = await userService.getUserByEmail(email);
      if (!result) {
        throw new Error('Usuario no encontrado');
      }
      if (!isValidPassword(result, password)) {
        throw new Error('Contraseña incorrecta');
      }
      result.last_connection = moment().format('DD-MM-YYYY HH:mm:ss');
      await result.save();
      return result;
    } catch (error) {
      throw error;
    }
  };
}
