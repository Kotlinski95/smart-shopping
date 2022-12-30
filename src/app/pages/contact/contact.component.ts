import { FormGroup } from '@angular/forms';
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
  public contactForm: FormGroup = this.formService.getContantForm();

  constructor(private formService: FormService, private store: Store) {}

  public onSubmit(): void {
    this.store.dispatch(
      FormActions.sendContactForm({
        value: this.contactForm.value,
      })
    );
  }
}
