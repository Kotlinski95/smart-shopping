import { FormGroup } from '@angular/forms';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormService } from 'src/app/shared/services/form.service';
import { FormActions } from 'src/app/state/actions';
import { distinctUntilKeyChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../../styles/form.scss'],
})
export class ContactComponent implements OnDestroy {
  public contactForm: FormGroup = this.formService.getContantForm();
  private subscriptions: Subscription = new Subscription();

  constructor(private formService: FormService, private store: Store) {
    this.subscriptions.add(
      this.contactForm.valueChanges
        .pipe(distinctUntilKeyChanged('topic'))
        .subscribe(data => {
          this.contactForm.patchValue({ topicValue: data.topic });
        })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onSubmit(): void {
    this.store.dispatch(
      FormActions.sendContactForm({
        value: this.contactForm.value,
      })
    );
  }
}
