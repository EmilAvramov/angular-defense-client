import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface Posting
	extends Model<
		InferAttributes<Posting>,
		InferCreationAttributes<Posting>
	> {
	id: CreationOptional<number>;
    userEmail: string,
    deviceKey: string,
    comments: string,
	price: number,
}
