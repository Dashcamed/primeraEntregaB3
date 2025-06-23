import Router from './class/route';
import { getAllPets } from '../controllers/pet.controller';
import upload from '../config/multer';
import { addImage } from '../controllers/pet.controller';

export default class PetRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/all', ['PUBLIC'], getAllPets);

    this.post(
      '/:uid/imagePet',
      ['USER', 'ADMIN'],
      upload.single('pet'),
      addImage,
    );
  }
}
