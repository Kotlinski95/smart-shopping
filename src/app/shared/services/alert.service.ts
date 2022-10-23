import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Alert, AlertProps, AlertType } from '../interfaces/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertInitialState: Alert = {
    show: false,
    props: {
      type: AlertType.None,
      message: '',
      duration: 0,
    },
  };
  private alertState: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(
    this.alertInitialState
  );
  public getAlertState(): Observable<Alert> {
    return this.alertState.asObservable();
  }

  public showAlert(): void {
    this.alertState.next({ ...this.alertState.getValue(), show: true });
  }

  public hideAlert(): void {
    this.alertState.next({ ...this.alertState.getValue(), show: false });
  }

  public setAlert(props: AlertProps): void {
    this.alertState.next({
      ...this.alertState.getValue(),
      props: props,
      show: true,
    });
    this.delay(props.duration, () => this.hideAlert());
  }

  public delay(time: number, callback: () => void): void {
    const source = timer(time);
    source.subscribe(() => {
      callback();
    });
  }
}
