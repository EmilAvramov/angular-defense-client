import {
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface Brand
	extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
	brandId: number;
	brandName: string;
	brandKey: string;
}