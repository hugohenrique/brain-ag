import { Sequelize } from 'sequelize-typescript';
import { Producer } from './src/core/domain/model/Producer';
import 'reflect-metadata';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

sequelize.addModels([Producer]);

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.close();
});
