import { UserState, StorageState } from './user.models'

export const USER_FEATURE_KEY = 'user'
export const STORAGE_FEATURE_KEY = 'storage'

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