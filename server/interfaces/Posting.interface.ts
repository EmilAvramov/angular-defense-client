import {
	Association,
	CreationOptional,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize';
import { Device } from './Device.interface';
import { User } from './User.interface';

export class Posting extends Model<
	InferAttributes<Posting>,
	InferCreationAttributes<Posting>
> {
	declare id: CreationOptional<number>;
	declare userEmail: ForeignKey<User['email']>;
	declare deviceKey: ForeignKey<Device['deviceKey']>;
	declare comments: string;
	declare price: number;
	
	declare users?: NonAttribute<User[]>;
	declare details?: NonAttribute<Device[]>

	declare static associations: {
		users: Association<Posting, User>;
		details: Association<Posting, Device>
	};
}