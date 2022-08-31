import {
	Association,
	ForeignKey,
	HasOneGetAssociationMixin,
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
	declare deviceId: number;
	declare deviceName: string;
	declare deviceType: string;
	declare deviceImage: string;
	declare deviceKey: ForeignKey<DeviceDetails['deviceKey']>;
	declare fkBrand: ForeignKey<Brand['brandId']>;
	declare getBrands: HasOneGetAssociationMixin<Brand>;
	declare getDetails: HasOneGetAssociationMixin<DeviceDetails>

	declare brands?: NonAttribute<Brand[]>
	declare details?: NonAttribute<DeviceDetails[]>

	declare static associations: {
		brands: Association<Device, Brand>
		details: Association<Device, DeviceDetails>

	}
}