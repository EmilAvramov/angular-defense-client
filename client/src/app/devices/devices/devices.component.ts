import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Device } from 'src/app/shared/interfaces/Devices.interface';
import { DataService } from '../services/data.service';
import { finalize, Subject } from 'rxjs';

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
		this.offset = 0;
		this.dataService.requestData(this.data, this.limit, this.offset)
	}

	loadMore(): void {
		this.offset += 100;
		this.dataService.requestData(this.data, this.limit, this.offset)
	}

	query(query: string): void {
		this.data = [];
		this.dataService.queryData(this.data, query);
	}
}
