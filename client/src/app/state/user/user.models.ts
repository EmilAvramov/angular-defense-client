export interface UserSession {
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
}

export interface UserAuth {
	payload: {
		email: string;
		firstName: string;
		lastName: string;
		phone: string;
		address: string;
		city: string;
	};
	accessToken: string;
}