import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { User } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
	@Input() user$: Observable<User | null> | undefined;
	@Output() search = new EventEmitter<string>();
	@Output() create = new EventEmitter<null>();

	@ViewChild('searchInput') searchPosting!: ElementRef<HTMLInputElement>;

	constructor() {}

	ngAfterViewInit() {
		fromEvent(this.searchPosting.nativeElement, 'input')
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				map((e: Event) => (e.target as HTMLInputElement).value)
			)
			.subscribe({
				next: (res) => this.search.emit(res),
				error: (err) => console.log(err),
			});
	}

	onCreate() {
		this.create.emit();
	}
}
