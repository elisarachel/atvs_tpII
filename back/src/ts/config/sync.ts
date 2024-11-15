import sequelize from '../config/database';
import '../models/cliente';
import '../models/documento';
import '../models/hospedagem';
import '../models/acomodacao';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

export default syncDatabase;
