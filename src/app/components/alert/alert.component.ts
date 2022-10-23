import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/shared/interfaces/alert';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AlertComponent {
  @Input() type = false;
  public alertState$: Observable<Alert> = new Observable<Alert>();
  constructor(private alertService: AlertService) {
    this.alertState$ = this.alertService.getAlertState();
  }
}
