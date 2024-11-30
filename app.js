const express = require('express');
const bodyParser = require('body-parser');
const carsRouter = require('./routes/cars');

const app = express();

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api', carsRouter);

// Porta padrão
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
