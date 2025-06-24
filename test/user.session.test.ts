import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';
import { before, after } from 'node:test';

//* Para mantener la validación estricta de consultas
mongoose.set('strictQuery', true);

// URL de conexión a la base de datos de testing
const MONGO_URI = 'mongodb://localhost:27017/mocksGeneratorTest';

const mockUser = {
  first_name: 'Usuario de prueba 2',
  last_name: 'Apellido de prueba 2',
  email: 'correodeprueba2@gmail.com',
  password: '123456',
};
let cookie = null;

describe('Registro de usuario', () => {
  before(async function () {
    // Conexión a MongoDB antes de correr los tests
    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB for testing');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB for testing:', err);
      });
    // Usuario de prueba
  });

  after(async function () {
    // Limpia la colección de usuarios después de correr los tests
    await mongoose.connection.collection('users').deleteMany({
      email: this.mockUser.email,
    });

    // Cierra la conexión a MongoDB después de correr todos los tests
    await mongoose.connection.close();
  });

  it('debería registrar un usuario correctamente', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.payload).toHaveProperty('email', mockUser.email);
  });
});
