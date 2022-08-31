import {
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface Device
	extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
	deviceId: number;
	deviceName: string;
	deviceType: string;
	deviceImage: string;
	deviceKey: string;
	fkBrand: number,
}
