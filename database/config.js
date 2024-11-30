import { Sequelize } from 'sequelize';

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/cars.sqlite', // Local onde o arquivo do banco será salvo
  logging: console.log // Ativando logs de SQL para debug
});

export default sequelize;
