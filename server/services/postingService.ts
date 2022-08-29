import { DeviceDetailsModel, DevicePostingModel } from '../models/database.model';
import { UserModel } from '../models/user.model';

export const getAllPostings = async () => {
    try {
		return await DevicePostingModel.findAll({
            include: [
                {
                    model: UserModel,
                    required: true
                },
                {
                    model: DeviceDetailsModel,
                    required: true
                }
            ]

        })
	} catch (err:any) {
		throw new Error(err.message)
	}
} 