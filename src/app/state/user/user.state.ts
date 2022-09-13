export const USER_FEATURE_KEY = 'user';

export const initialUserState: UserState = {
	id: 0,
	email: '',
	firstName: '',
	lastName: '',
	phone: '',
	address: '',
	city: '',
	token: '',
	validated: null,
	loaded: false,
	error: null,
};

export interface UserState {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
	validated: User | null;
	loaded: boolean;
	error: string | null;
}

export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
}

export interface Error {
	error: Message;
	message: string;
	name: string;
	ok: boolean;
	status: number;
	statusText: string;
	url: string;
}

export interface Message {
	message: string | null
}