import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/devices/services/modal.service';
import { Posting } from 'src/app/state/posting/posting.state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
	public display$!: Observable<boolean>;

	@Input() details!: Posting | null;

	constructor(private modal: ModalService) {
		this.display$ = this.modal.watch();
	}

	close() {
		this.modal.close();
	}
}
