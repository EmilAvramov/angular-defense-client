import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { server } from 'src/app/shared/variables/config';
import { ExternalDataRequest } from './external.state';

@Injectable()
export class ExternalService {
	private headers = { 'content-type': 'application/json' };

	constructor(private http: HttpClient) {}

	getData(): Observable<ExternalDataRequest> {
		return this.http.get<ExternalDataRequest>(`${server}/data/recommended`, {
			headers: this.headers,
		});
	}
}
