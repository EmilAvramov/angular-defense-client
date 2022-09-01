import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
	@Output() search = new EventEmitter<string>();
	@Output() create = new EventEmitter<string>();

	@ViewChild('searchInput') searchPosting!: ElementRef<HTMLInputElement>;

	constructor() {}

	ngOnInit(): void {}

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
		this.create.emit('requesting create modal');
	}
}
