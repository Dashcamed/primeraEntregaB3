import { Request, Response } from 'express';
import UserServices from '../services/user.services';

const userServices = new UserServices();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).send({ status: 'success', payload: users });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: 'error', error: 'Error al obtener usuarios' });
  }
};
