import bcrypt from 'bcrypt';
import { UserModel } from '../interfaces/interfaces';

export const generateHash = async (password: string) =>
  await bcrypt.hash(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user: UserModel, password: string) => {
  if (!user || !user.password || !password) {
    return false;
  }
  const result = bcrypt.compareSync(password, user.password.toString());
  return result;
};

export const generateOrderCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomLetters = Array.from(
    { length: 5 },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join('');

  const randomNumbers = Array.from(
    { length: 5 },
    () => numbers[Math.floor(Math.random() * numbers.length)],
  ).join('');

  return randomLetters + randomNumbers;
};
