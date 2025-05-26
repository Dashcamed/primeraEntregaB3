import petModel from './models/pet.model';
import { PetModel } from '../../interfaces/interfaces';

export default class PetMongo {
  constructor() {}

  async create(pet: PetModel) {
    try {
      const newPet = await petModel.create(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createMany(pets: PetModel[]) {
    try {
      const newPets = await petModel.insertMany(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const pets = await petModel.find();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const pet = await petModel.findById(id);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, pet: PetModel) {
    try {
      const updatedPet = await petModel.findByIdAndUpdate(id, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deletedPet = await petModel.findByIdAndDelete(id);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
