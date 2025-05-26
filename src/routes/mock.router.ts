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
    this.get('/mockingPets', getPetMock);
    this.get('/mockingUsers', getUserMock);
    this.post('/generateData', generateData);
  }
}
