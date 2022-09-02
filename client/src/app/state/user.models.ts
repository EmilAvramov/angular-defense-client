export interface User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	accessToken: string;
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
	accessToken: string;
}