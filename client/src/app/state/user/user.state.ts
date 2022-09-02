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
	loading: boolean,
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
    loading: false,
    error: null
}
