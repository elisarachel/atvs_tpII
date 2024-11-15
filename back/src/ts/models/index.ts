import sequelize from '../config/database'; // Adjust the path as needed
import Cliente from './cliente';
import Documento from './documento';
import Acomodacao from './acomodacao';
import Hospedagem from './hospedagem';

// Initialize each model
const models = {
  Cliente: Cliente.initModel(sequelize),
  Documento: Documento.initModel(sequelize),
  Acomodacao: Acomodacao.initModel(sequelize),
  Hospedagem: Hospedagem.initModel(sequelize)
};

// Set up associations after all models are initialized
Object.values(models).forEach((model) => {
  if ('associate' in model && typeof model.associate === 'function') {
    model.associate(models);
  }
});

export default models;
