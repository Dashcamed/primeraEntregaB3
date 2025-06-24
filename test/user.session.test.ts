import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Set mongoose to use strict queries
mongoose.set('strictQuery', true);

const mongoUrlTest = 'mongodb://localhost:27017/mocksGeneratorTest';

// Explicitly type the request object to avoid TypeScript errors
const request = supertest(app) as any;

describe('Testing User', function () {
  this.timeout(6000);

  // Define mockUser and cookie on the context
  let mockUser: User;
  let cookie: string;

  before(async function () {
    try {
      await mongoose.connect(mongoUrlTest);
      console.log('Connected to MongoDB');

      mockUser = {
        first_name: 'Camila',
        last_name: 'Garcia',
        email: 'camila@gmail.com',
        password: '123456',
      };
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  });

  after(async function () {
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.collection('users').deleteMany({
          email: mockUser.email,
        });
      }
    } catch (error) {
      console.error('Error cleaning up test data', error);
    } finally {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
      }
    }
  });

  it('Register a new user', async function () {
    const { statusCode } = await request
      .post('/api/user/register')
      .send(mockUser);
    expect(statusCode).to.equal(201);
  });
});
