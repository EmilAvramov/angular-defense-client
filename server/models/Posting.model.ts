import { DataType } from "sequelize-typescript";
import database from "../config/database";
import { Posting } from "../interfaces/Posting.interface";
import { DeviceDetailsModel } from "./DeviceDetails.model";
import { UserModel } from "./User.model";

export const PostingModel = database.sequelize.define<Posting>(
	'Posting',
	{
		id: {
			primaryKey: true,
			type: DataType.INTEGER,
			autoIncrement: true,
		},
		userEmail: {
			type: DataType.TEXT,
		},
		deviceKey: {
			type: DataType.TEXT,
		},
		comments: {
			type: DataType.TEXT,
			allowNull: true,
		},
		price: {
			type: DataType.DECIMAL,
			allowNull: false
		}
	},
	{ timestamps: false }
);

PostingModel.belongsTo(UserModel, {
	targetKey: 'id',
	foreignKey: 'userId',
});

PostingModel.belongsTo(DeviceDetailsModel, {
	targetKey: 'id',
	foreignKey: 'deviceId',
});

PostingModel.sync()
