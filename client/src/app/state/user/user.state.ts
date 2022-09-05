export const USER_FEATURE_KEY = 'user'

export const initialUserState: UserState = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    token: '',
    loaded: false,
    error: null
}

export interface UserState {
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

export interface User {
    email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
}