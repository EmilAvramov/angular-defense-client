import {
    CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface User
	extends Model<
		InferAttributes<User>,
		InferCreationAttributes<User>
	> {
        id: CreationOptional<number>,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        address: string,
        city: string
    }
