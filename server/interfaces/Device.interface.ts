import {
	Association,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize';
import { Posting } from './Posting.interface';

export class Device extends Model<
	InferAttributes<Device>,
	InferCreationAttributes<Device>
> {
	declare id: CreationOptional<number>;
	declare deviceKey: string;
	declare deviceName: string;
	declare deviceImage: string;
	declare connectivity: string;
	declare launchDate: string;
	declare dimensions: string;
	declare weight: string;
	declare build: string;
	declare sim: string;
	declare display: string;
	declare size: string;
	declare resolution: string;
	declare protection: string;
	declare os: string;
	declare chipset: string;
	declare cpu: string;
	declare gpu: string;
	declare cardSlot: string;
	declare internalStorage: string;
	declare cameraMain: string;
	declare videoMain: string;
	declare cameraSelfie: string;
	declare videoSelfie: string;
	declare speakers: string;
	declare jack: string;
	declare features: string;
	declare batteryCharge: string;
	declare batteryType: string;
	declare price: string;

	declare postings?: NonAttribute<Posting[]>;

	declare static associations: {
		postings: Association<Device, Posting>;
	};
}
