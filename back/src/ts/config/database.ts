import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('atvv_tp', 'root', 'senha123', {
	host: 'localhost',
	dialect: 'mysql',
});

export default sequelize;