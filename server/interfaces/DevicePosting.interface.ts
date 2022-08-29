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
    userEmail: string,
    deviceKey: string,
    comments: string,
	price: number,
}
