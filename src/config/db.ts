import { Sequelize } from 'sequelize-typescript';
import { Producer } from '../core/domain/model/Producer';

const sequelize = new Sequelize({
  database: 'brain-ag',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  models: [Producer],
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;