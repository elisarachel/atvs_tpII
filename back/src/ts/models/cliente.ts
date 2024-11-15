import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from 'sequelize';
import Documento from './documento';

class Cliente extends Model {
	public id!: string;
	public nome!: string;
	public nomeSocial!: string;
	public dataNascimento!: Date;
	public dataCadastro!: Date;

	public rua!: string;
	public numero!: string;
	public bairro!: string;
	public cidade!: string;
	public estado!: string;
	public cep!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	
	public addDependente!: (dependente: Cliente) => Promise<void>;
	public getDependentes!: HasManyGetAssociationsMixin<Cliente>;
	public getTitular!: BelongsToGetAssociationMixin<Cliente>;
	public setTitular!: (titular: Cliente) => Promise<void>;
	public documentos!: Documento[];
	
	public static associate(models: any) {
		Cliente.hasMany(models.Documento, { foreignKey: 'clienteId', as: 'documentos' });
		Cliente.hasMany(models.Cliente, { foreignKey: 'titularId', as: 'dependentes' });
		Cliente.belongsTo(models.Cliente, { foreignKey: 'titularId', as: 'titular' });
	}
	
	public static initModel = (sequelizeInstance: Sequelize) => {
		Cliente.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true,
				},
				nome: {
					type: new DataTypes.STRING(128),
					allowNull: false,
				},
				nomeSocial: {
					type: new DataTypes.STRING(128),
					allowNull: true,
				},
				dataNascimento: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				dataCadastro: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: DataTypes.NOW,
				},
				rua: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				numero: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				bairro: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				cidade: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				estado: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				cep: {
					type: DataTypes.STRING,
					allowNull: false,
				},
			},
			{
				tableName: 'clientes',
				sequelize: sequelizeInstance,
			}
		);
		
		return Cliente;
	};
}

export default Cliente;
