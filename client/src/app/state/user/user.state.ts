export const USER_FEATURE_KEY = 'user'

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

export interface UserAuth {
    email: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	city: string;
	token: string;
}