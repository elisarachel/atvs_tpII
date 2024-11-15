import { DataTypes, Model, Sequelize } from 'sequelize';
import { TipoDocumento } from '../enumeracoes/TipoDocumento';

class Documento extends Model {
	public id!: string;
	public tipo!: TipoDocumento;
	public numero!: string;
	public dataExpedicao!: Date;
	public clienteId!: string;
	
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	
	public static associate(models: any) {
		Documento.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
	}
	
	public static initModel = (sequelizeInstance: Sequelize) => {
		Documento.init(
			{
				id: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey: true,
				},
				tipo: {
					type: new DataTypes.ENUM(...Object.values(TipoDocumento)),
					allowNull: false,
				},
				numero: {
					type: new DataTypes.STRING(128),
					allowNull: false,
				},
				dataExpedicao: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				clienteId: {
					type: DataTypes.UUID,
					allowNull: false,
				},
			},
			{
				tableName: 'documentos',
				sequelize: sequelizeInstance,
			}
		);
		
		return Documento;
	};
}

export default Documento;