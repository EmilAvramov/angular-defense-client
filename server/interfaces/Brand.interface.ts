import {
	Association,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize/types';
import { Device } from './Device.interface';

export class Brand extends Model<
	InferAttributes<Brand>,
	InferCreationAttributes<Brand>
> {
	declare brandId: number;
	declare brandName: string;
	declare brandKey: string;
	declare getDevices: HasManyGetAssociationsMixin<Device>;
	declare countDevices: HasManyCountAssociationsMixin;

	declare devices?: NonAttribute<Device[]>

	declare static associations: {
		devices: Association<Brand, Device>
	}
}