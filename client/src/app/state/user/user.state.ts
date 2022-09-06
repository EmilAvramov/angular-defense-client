export const USER_FEATURE_KEY = 'user'

export const initialUserState: UserState = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    token: '',
	validated: null,
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
	validated: User | null,
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