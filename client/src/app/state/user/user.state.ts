export const USER_FEATURE_KEY = 'user'

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

export const initialUserState: UserState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    token: '',
    loaded: false,
    error: null
}
