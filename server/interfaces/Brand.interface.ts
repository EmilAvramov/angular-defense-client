import {
	Association,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize';
import { Device } from './Device.interface';

export class Brand extends Model<
	InferAttributes<Brand>,
	InferCreationAttributes<Brand>
> {
	declare brandId: number;
	declare brandName: string;
	declare brandKey: string;

	declare devices?: NonAttribute<Device[]>

	declare static associations: {
		devices: Association<Brand, Device>
	}
}