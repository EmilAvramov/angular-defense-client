import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { DataService } from '../services/data.service';

@Component({
	selector: 'devices-page',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.sass'],
})
export class DevicesComponent implements OnInit {
	public limit: number = 100;
	public offset: number = 0;
	public data: Device[] = [];

	constructor(
		private spinner: NgxSpinnerService,
		private dataService: DataService
	) {}

	ngOnInit(): void {
		this.limit = 100;
		this.offset = 0;
		this.spinner.show();
		console.log(this.spinner)
		this.dataService.requestData(this.data, this.limit, this.offset);
		this.spinner.hide()
	}

	loadMore(): void {
		this.limit += 100;
		this.offset += 100;
		this.spinner.show();
		this.dataService.requestData(this.data, this.limit, this.offset);
		this.spinner.hide()
	}

	query(query: string): void {
		this.spinner.show();
		this.dataService.queryData(this.data, query);
		this.spinner.hide()
	}
}
