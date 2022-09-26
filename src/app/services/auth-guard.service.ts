import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	routeURL: string;

	constructor(private router: Router) {
		this.routeURL = this.router.url;
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		if (localStorage.getItem('token') && this.routeURL !== '/login') {
			this.routeURL = '/login';
			this.router.navigate(['/login'], {
				queryParams: {
					return: 'login',
				},
			});
			return of(false);
		} else {
			this.routeURL = this.router.url;
			return of(true);
		}
	}
}
