import { Types } from 'mongoose';
import { UserModel } from '../../interfaces/interfaces';
import { DocumentModel } from '../../interfaces/interfaces';

export default class UserDTO {
  last_connection?: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  pets?: Types.ObjectId[];
  documents?: DocumentModel[];
  constructor(user: UserModel) {
    this.last_connection = user.last_connection;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.pets = user.pets;
    this.documents = user.documents;
  }
}
