import { faker } from '@faker-js/faker/locale/es';
import { generateHash } from '../utils/utils';
import { UserModel, PetModel } from '../interfaces/interfaces';

export default class MockingServices {
  constructor() {}

  static async generateUsers(quantity: number) {
    const users = [];
    for (let i = 0; i < quantity; i++) {
      const user: UserModel = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await generateHash('coder123'),
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [],
      };
      users.push(user);
    }
    return users;
  }

  static async generatePets(quantity: number) {
    const pets = [];
    for (let i = 0; i < quantity; i++) {
      const pet: PetModel = {
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past(),
        adopted: faker.datatype.boolean(),
        owner: null,
      };
      pets.push(pet);
    }
    return pets;
  }

  static async generateData(users: number, pets: number) {
    const usersMock = await this.generateUsers(users);
    const petsMock = await this.generatePets(pets);
    return { users: usersMock, pets: petsMock };
  }
}
