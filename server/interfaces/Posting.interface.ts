import {
	Association,
	CreationOptional,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize';
import { DeviceDetails } from './DeviceDetails.interface';
import { User } from './User.interface';

export class Posting extends Model<
	InferAttributes<Posting>,
	InferCreationAttributes<Posting>
> {
	declare id: CreationOptional<number>;
	declare userEmail: ForeignKey<User['email']>;
	declare deviceKey: ForeignKey<DeviceDetails['deviceKey']>;
	declare comments: string;
	declare price: number;
	
	declare users?: NonAttribute<User[]>;
	declare details?: NonAttribute<DeviceDetails[]>

	declare static associations: {
		users: Association<Posting, User>;
		details: Association<Posting, DeviceDetails>
	};
}