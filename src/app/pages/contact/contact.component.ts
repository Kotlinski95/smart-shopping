import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormService } from 'src/app/shared/services/form.service';
import { FormActions } from 'src/app/state/actions';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../../styles/form.scss'],
})
export class ContactComponent {
  constructor(private formService: FormService, private store: Store) {}
  contactForm = this.formService.getContantForm();
  public onSubmit(): void {
    this.store.dispatch(
      FormActions.sendContactForm({ form: this.contactForm.value })
    );
  }
}
