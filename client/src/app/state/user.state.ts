import { User } from './user.models'

export const initialUserState: User = {
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