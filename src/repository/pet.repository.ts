import PetMongo from '../dao/mongo/pet.mongo';
import { PetModel } from '../interfaces/interfaces';

const petMongo = new PetMongo();

export default class PetRepository {
  constructor() {}

  async createPet(pet: PetModel) {
    try {
      const newPet = await petMongo.create(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createManyPets(pets: PetModel[]) {
    try {
      const newPets = await petMongo.createMany(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAllPets() {
    try {
      const pets = await petMongo.getAll();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getPetById(id: string) {
    try {
      const pet = await petMongo.getById(id);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async updatePet(id: string, pet: PetModel) {
    try {
      const updatedPet = await petMongo.update(id, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async deletePet(id: string) {
    try {
      const deletedPet = await petMongo.delete(id);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
