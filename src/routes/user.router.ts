import { getAllUsers, addDocument } from '../controllers/user.controller';
import upload from '../config/multer';
import Router from './class/route';
import { Request, Response } from 'express';

export default class UserRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/all', ['PUBLIC'], getAllUsers);

    this.post(
      '/:uid/documents',
      ['USER', 'ADMIN'],
      upload.single('document'),
      addDocument,
    );

    this.get('/current', ['USER', 'ADMIN'], (req: Request, res: Response) => {
      res.send({ status: 'success', payload: req.user });
    });
  }
}
