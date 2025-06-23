import UserService from './user.services';
import type { UserModel } from '../interfaces/interfaces';
import { isValidPassword } from '../utils/utils';
import { logger } from '../config/logger';

const userService = new UserService();

export default class SessionServices {
  constructor() {}

  registerUser = async (user: UserModel) => {
    try {
      const { first_name, last_name, email, password } = user;
      if (!first_name || !last_name || !email || !password) {
        logger.error('Rellena todos los campos');
        throw new Error('Rellena todos los campos');
      }
      const result = await userService.createUser(user);
      return result;
    } catch (error) {
      logger.error(error);
    }
  };

  login = async (user: UserModel) => {
    try {
      const { email, password } = user;
      if (!email || !password) {
        logger.error('Faltan datos');
        throw new Error('Faltan datos');
      }
      const result = await userService.getUserByEmail(email);
      if (!result) {
        logger.error('Usuario no encontrado');
        throw new Error('Usuario no encontrado');
      }
      if (!isValidPassword(result, password)) {
        logger.error('Contraseña incorrecta');
        throw new Error('Contraseña incorrecta');
      }
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}
