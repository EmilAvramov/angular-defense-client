import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
	public display$!: Observable<boolean>;

	constructor(private modal: ModalService) {}

	ngOnInit(): void {
		this.display$ = this.modal.watch();
	}

	close() {
		this.modal.close();
	}
}
