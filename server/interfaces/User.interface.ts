import {
    CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	Model,
} from 'sequelize/types';

export interface UserModel
	extends Model<
		InferAttributes<UserModel>,
		InferCreationAttributes<UserModel>
	> {
        id: CreationOptional<number>,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: number,
        address: string,
        city: string
    }
