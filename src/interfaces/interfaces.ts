export interface PetModel {
  name: string;
  specie: string;
  birthDate: Date;
  adopted: boolean;
  owner: string | null;
}

export interface UserModel {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  pets: string[];
}
