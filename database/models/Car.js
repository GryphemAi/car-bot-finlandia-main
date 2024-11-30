const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Car = sequelize.define(
  'Car',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendedor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    condicao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contato: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quilometragem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cambio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proprietarios: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inspecionado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sistema_de_transmissao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    especificacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seguranca: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    interior_comodidades: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eletronica: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    informacoes_adicionais: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    outros: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
  }
);

module.exports = Car;
