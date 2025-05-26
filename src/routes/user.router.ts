import Router from './class/route';
import { getAllUsers } from '../controllers/user.controller';

export default class UserRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/all', getAllUsers);
  }
}
