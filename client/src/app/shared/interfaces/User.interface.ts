export interface User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
}

export interface UserDetails {
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
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
