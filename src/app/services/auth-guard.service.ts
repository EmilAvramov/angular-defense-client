import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { UserFacade } from '../state/user/user.facade';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	routeURL: string;

	constructor(private userFacade: UserFacade, private router: Router) {
		this.routeURL = this.router.url;
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		return new Promise<boolean>((res, rej) => {
			this.userFacade.userToken$.subscribe((value: string) => {
				if (!value && this.routeURL !== '/login') {
					this.routeURL = '/login';
					this.router.navigate(['/login'], {
						queryParams: {
							return: 'login',
						},
					});
					return res(false);
				} else {
					this.routeURL = this.router.url;
					return res(true);
				}
			});
		});
	}
}
