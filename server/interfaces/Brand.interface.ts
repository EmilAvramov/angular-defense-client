import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class Brand extends Model<
	InferAttributes<Brand>,
	InferCreationAttributes<Brand>
> {
	declare brandId: number;
	declare brandName: string;
	declare brandKey: string;
}
