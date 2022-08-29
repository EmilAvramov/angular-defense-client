import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface DevicePosting
	extends Model<
		InferAttributes<DevicePosting>,
		InferCreationAttributes<DevicePosting>
	> {
	id: CreationOptional<number>;
    userId: number,
    deviceId: number,
    comments: string,
	price: number,
}
