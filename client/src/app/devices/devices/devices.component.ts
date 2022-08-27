import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { DataService } from '../services/data.service';
import { finalize, first } from 'rxjs';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit {
	public limit: number = 100;
	public offset: number = 0;
	public data: Device[] = [];
	public requested: boolean = false;

	constructor(
		private spinner: NgxSpinnerService,
		private dataService: DataService
	) {}

	ngOnInit(): void {
		this.offset = 0;
		this.spinner.show();
		this.dataService
			.requestData(this.limit, this.offset)
			.pipe(first())
			.subscribe({
				next: (value: any) => {
					value.forEach((item: Device) => {
						this.data.push(item);
					});
					this.spinner.hide();
				},
				error: (err) => console.log(err.message),
			});
	}

	loadMore(): void {
		if (this.requested) {
			this.data = [];
		}
		this.offset += 100;
		this.dataService
			.requestData(this.limit, this.offset)
			.pipe(first())
			.subscribe({
				next: (value: any) => {
					console.log(value);
					value.forEach((item: Device) => {
						this.data.push(item);
					});
					this.requested = false;
				},
				error: (err) => console.log(err.message),
			});
	}

	query(query: string): void {
		if (query) {
			this.requested = true;
			this.spinner.show();
			this.data = [];
			this.dataService
				.queryData(query)
				.pipe(first())
				.subscribe({
					next: (value: any) => {
						value.forEach((item: Device) => {
							this.data.push(item);
						});
						this.spinner.hide();
					},
					error: (err) => console.log(err.message),
				});
		}
	}
}
