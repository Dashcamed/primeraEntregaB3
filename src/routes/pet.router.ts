import Router from './class/route';
import { getAllPets } from '../controllers/pet.controller';

export default class PetRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/all', getAllPets);
  }
}
