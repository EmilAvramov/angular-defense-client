import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export const server = 'http://localhost:3000';
export const optionsPost = {
	headers: HttpHeaders,
	observe: 'response',
	context: HttpContext,
	params: HttpParams,
	responseType: 'json',
	withCredentials: false,
};
    