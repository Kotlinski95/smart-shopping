import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Modal, ModalParams, ModalType } from '../interfaces/modal';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private initialModalState: Modal = { isOpen: false, type: ModalType.None };
  private initialButtonActionState = false;
  private initialModalParams: ModalParams = {
    title: 'Title',
    content: 'Content',
    btnClose: true,
    btnCloseLabel: 'Close',
    btnConfirm: true,
    btnConfirmLabel: 'Save',
  };
  private modalState: BehaviorSubject<Modal> = new BehaviorSubject(
    this.initialModalState
  );
  private modalParams: BehaviorSubject<ModalParams> = new BehaviorSubject(
    this.initialModalParams
  );
  private modalButtonActionCalled: BehaviorSubject<boolean> =
    new BehaviorSubject(this.initialButtonActionState);
  public modalButtonActionCalled$ = this.modalButtonActionCalled.asObservable();

  public getModalState(): Observable<Modal> {
    return this.modalState.asObservable();
  }
  public getModalParams(): Observable<ModalParams> {
    return this.modalParams.asObservable();
  }
  public showModal(): void {
    this.modalState.next({ ...this.modalState.getValue(), isOpen: true });
  }
  public hideModal(): void {
    this.modalState.next({ ...this.modalState.getValue(), isOpen: false });
    this.modalButtonActionCalled.next(false);
  }

  public createModal(modalParams: ModalParams): void {
    this.modalParams.next(modalParams);
    this.modalState.next({
      ...this.modalState.getValue(),
      params: modalParams,
    });
  }
  public setModalContent(contentValue: string): void {
    this.modalState.next({
      ...this.modalState.getValue(),
      params: {
        ...this.modalParams.getValue(),
        content: contentValue,
      },
    });
  }

  public setModalCallback(callback: () => void): void {
    this.modalState.next({
      ...this.modalState.getValue(),
      callback: callback,
    });
  }

  public modalButtonAction(): void {
    this.modalButtonActionCalled.next(true);
    // this.modalButtonActionCalled.next(false);
  }
}
