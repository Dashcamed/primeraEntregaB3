import Router from './class/route';
import {
  getPetMock,
  getUserMock,
  generateData,
} from '../controllers/mock.controller';

export default class MockRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/mockingPets', ['PUBLIC'], getPetMock);
    this.get('/mockingUsers', ['PUBLIC'], getUserMock);
    this.post('/generateData', ['ADMIN'], generateData);
  }
}
