import { Request, Response } from 'express';
import PetServices from '../services/pets.services';

const petServices = new PetServices();

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await petServices.getAllPets();
    res.status(200).send({ status: 'success', payload: pets });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({ status: 'error', error: 'Error al obtener mascotas' });
  }
};

export const addImage = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 'error',
        error: 'El nombre de la imagen es requerido',
      });
    }

    const pet = await petServices.getPetById(uid);
    if (!pet) {
      return res.status(404).json({
        status: 'error',
        error: 'Mascota no encontrada',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        error: 'No se ha subido ningún archivo',
      });
    }

    pet.image.push({
      name: name,
      reference: req.file.path,
    });

    await pet.save();

    res.status(200).json({
      status: 'success',
      message: 'Archivo subido correctamente',
      image: {
        name: name,
        reference: req.file.path,
      },
    });
  } catch (error) {
    req.logger.error(error);
    res.status(500).json({
      status: 'error',
      error: 'Error al procesar el archivo',
      details: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};
