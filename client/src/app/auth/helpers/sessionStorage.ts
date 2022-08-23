import { UserAuth } from 'src/app/shared/interfaces/User.interface';

export const setSessionStorage = (response: UserAuth) => {
	sessionStorage.setItem('email', response.payload.email);
	sessionStorage.setItem('firstName', response.payload.firstName);
	sessionStorage.setItem('lastName', response.payload.lastName);
	sessionStorage.setItem('phone', response.payload.phone);
	sessionStorage.setItem('address', response.payload.address);
	sessionStorage.setItem('city', response.payload.city);
	sessionStorage.setItem('token', response.accessToken);
};
