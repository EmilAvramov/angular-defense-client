import { UserState, UserSession, StorageState } from './user.models'

export const initialUserState: UserState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    accessToken: '',
    loaded: false,
    error: null
}

export const initialStorageState: StorageState = {
    email: "",
	firstName: "",
	lastName: "",
	phone: "",
	address: "",
	city: "",
	token: "",
    loaded: false,
    error: null
}