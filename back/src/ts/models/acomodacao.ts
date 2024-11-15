import { DataTypes, Model, Sequelize } from 'sequelize';
import { NomeAcomodacao } from '../enumeracoes/NomeAcomodacao';

class Acomodacao extends Model {
	public id!: string;
	public nomeAcomodacao!: NomeAcomodacao;
	public camaSolteiro!: number;
	public camaCasal!: number;
	public suite!: number;
	public climatizacao!: boolean;
	public garagem!: number;

	public static initModel = (sequelizeInstance: Sequelize) => {

		Acomodacao.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true,
				},
				nomeAcomodacao: {
					type: DataTypes.ENUM(...Object.values(NomeAcomodacao)),
					allowNull: false,
				},
				camaSolteiro: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				camaCasal: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				suite: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
				climatizacao: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
				},
				garagem: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
			},
			{
				tableName: 'acomodacoes',
				sequelize: sequelizeInstance,
			}
		);
	return Acomodacao;
	}
}



export default Acomodacao;