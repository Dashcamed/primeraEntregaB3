import { Types } from 'mongoose';
import { Request } from 'express';

export interface PetModel {
  name: string;
  specie: string;
  birthDate: Date;
  adopted: boolean;
  owner: string | null;
  image: {
    name: string;
    reference: string;
  }[];
}

export interface UserModel {
  last_connection?: Date;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: string;
  pets?: Types.ObjectId[];
  documents?: DocumentModel[];
}

export interface DocumentModel {
  name: string;
  reference: string;
  type?: string;
  _id?: Types.ObjectId;
}

export interface MulterRequest extends Request {
  params: {
    uid: string;
  };
  body: {
    name: string;
    type: string;
  };
  file?: Express.Multer.File;
}
