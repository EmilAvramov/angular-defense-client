export interface UserState {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
	loaded: boolean,
    error: string | null
}

export interface StorageState {
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
	loaded: boolean,
    error: string | null
}

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