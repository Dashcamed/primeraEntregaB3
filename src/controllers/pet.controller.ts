import { Request, Response } from 'express';
import PetServices from '../services/pets.services';

const petServices = new PetServices();

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await petServices.getAllPets();
    res.status(200).send({ status: 'success', payload: pets });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: 'error', error: 'Error al obtener mascotas' });
  }
};
