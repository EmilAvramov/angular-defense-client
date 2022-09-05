import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Device } from 'src/app/state/device/device.state';
import { PostingPayload } from 'src/app/state/posting/posting.state';
import { UserAuth } from 'src/app/state/user/user.state';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.sass'],
})
export class CreateComponent {
	public display$!: Observable<boolean>;
	public posting!: PostingPayload | null;

	@Input() user!: UserAuth | null;
	@Input() devices!: Device[] | null;
	@Input() deviceDetails!: Device | null;
	@Output() requestDetails = new EventEmitter<string>();
	@Output() createPosting = new EventEmitter<PostingPayload>();

	@ViewChild('searchInput') searchDevice!: ElementRef<HTMLInputElement>;

	constructor(private modal: ModalService, private fb: FormBuilder) {
		this.display$ = this.modal.watch();
	}

	postingForm = this.fb.group({
		comments: [''],
		price: [''],
	});

	get comments() {
		return this.postingForm.get(['comments']);
	}

	get price() {
		return this.postingForm.get(['price']);
	}

	sendPosting(): void {
		this.posting = {
			userEmail: this.user!.email as string,
			deviceKey: this.deviceDetails!.deviceKey as string,
			comments: this.comments!.value,
			price: this.price!.value,
		};
		this.createPosting.emit(this.posting);
		this.close();
	}

	resetForm() {
		this.postingForm.reset();
	}

	close(): void {
		this.modal.close();
		this.searchDevice.nativeElement.value = '';
	}
}
