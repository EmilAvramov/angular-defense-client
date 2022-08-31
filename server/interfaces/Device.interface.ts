import {
	Association,
	CreationOptional,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize';
import { Brand } from './Brand.interface';
import { DeviceDetails } from './DeviceDetails.interface';

export class Device extends Model<
	InferAttributes<Device>,
	InferCreationAttributes<Device>
> {
	declare id: CreationOptional<number>;
	declare deviceName: string;
	declare deviceImage: string;
	declare deviceKey: ForeignKey<DeviceDetails['deviceKey']>;
	declare fkBrand: ForeignKey<Brand['brandKey']>;

	declare brands?: NonAttribute<Brand[]>
	declare details?: NonAttribute<DeviceDetails[]>

	declare static associations: {
		brands: Association<Device, Brand>
		details: Association<Device, DeviceDetails>

	}
}