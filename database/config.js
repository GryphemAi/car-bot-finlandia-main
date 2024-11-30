const { Sequelize } = require('sequelize');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/cars.sqlite', // Local onde o arquivo do banco será salvo
    logging: false // Desativa logs de SQL
});

module.exports = sequelize;
