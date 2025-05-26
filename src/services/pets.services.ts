import PetRepository from '../repository/pet.repository';
import { PetModel } from '../interfaces/interfaces';

const petRepository = new PetRepository();

export default class PetServices {
  constructor() {}

  async createPet(pet: PetModel) {
    try {
      const newPet = await petRepository.createPet(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createManyPets(pets: PetModel[]) {
    try {
      const newPets = await petRepository.createManyPets(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAllPets() {
    try {
      const pets = await petRepository.getAllPets();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getPetById(id: string) {
    try {
      const pet = await petRepository.getPetById(id);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async updatePet(id: string, pet: PetModel) {
    try {
      const updatedPet = await petRepository.updatePet(id, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async deletePet(id: string) {
    try {
      const deletedPet = await petRepository.deletePet(id);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
