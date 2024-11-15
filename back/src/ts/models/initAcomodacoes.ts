import sequelize from '../config/database';
import Acomodacao from '../models/acomodacao';
import DiretorCasalSimples from '../diretores/diretorCasalSimples';
import DiretorFamiliaSimples from '../diretores/diretorFamiliaSimples';
import DiretorFamiliaMais from '../diretores/diretorFamiliaMais';
import DiretorFamiliaSuper from '../diretores/diretorFamiliaSuper';
import DiretorSolteiroSimples from '../diretores/diretorSolteiroSimples';
import DiretorSolteiroMais from '../diretores/diretorSolteiroMais';

const initAcomodacoes = async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza o banco de dados

    const acomodacoes = [
      new DiretorCasalSimples().construir(),
      new DiretorFamiliaSimples().construir(),
      new DiretorFamiliaMais().construir(),
      new DiretorFamiliaSuper().construir(),
      new DiretorSolteiroSimples().construir(),
      new DiretorSolteiroMais().construir(),
    ];

    for (const acomodacao of acomodacoes) {
      await Acomodacao.create(acomodacao as any);
    }

    console.log('Acomodações inseridas com sucesso.');
  } catch (error) {
    console.error('Erro ao inserir acomodações:', error);
  } 
};

export default initAcomodacoes;