import {
	Association,
	CreationOptional,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
} from 'sequelize/types';
import { Posting } from './Posting.interface';

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare id: CreationOptional<number>;
	declare email: string;
	declare password: string;
	declare firstName: string;
	declare lastName: string;
	declare phone: string;
	declare address: string;
	declare city: string;
	declare getPostings: HasManyGetAssociationsMixin<Posting>;
	declare countPostings: HasManyCountAssociationsMixin;

	declare postings?: NonAttribute<Posting[]>;

	declare static associations: {
		postings: Association<User, Posting>;
	};
}
