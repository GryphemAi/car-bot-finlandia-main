const sequelize = require('./config');
const Car = require('./models/Car');

async function initDatabase() {
  try {
    // Sincroniza o modelo com o banco de dados
    await sequelize.sync();
    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
}

initDatabase();
