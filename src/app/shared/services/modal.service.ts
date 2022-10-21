import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Modal, ModalParams, ModalType } from '../interfaces/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private initialModalState: Modal = { isOpen: false, type: ModalType.None };
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
  }

  private createModal(modalParams: ModalParams): Promise<void> {
    return new Promise(resolve => {
      this.modalParams.next(modalParams);
      this.modalState.next({
        ...this.modalState.getValue(),
        params: modalParams,
      });
      resolve();
    });
  }

  private setModalContent(contentValue: string): Promise<void> {
    return new Promise(resolve => {
      this.modalState.next({
        ...this.modalState.getValue(),
        params: {
          ...this.modalParams.getValue(),
          content: contentValue,
        },
      });
      resolve();
    });
  }

  private setModalCallback(callback: () => void): void {
    this.modalState.next({
      ...this.modalState.getValue(),
      callback: callback,
    });
  }

  public setModal(modalParams: ModalParams, callback: () => void): void {
    this.createModal(modalParams).then(() => {
      this.setModalContent(modalParams.content ? modalParams.content : '').then(
        () => {
          this.showModal();
        }
      );
    });
    this.setModalCallback(() => {
      callback();
      this.hideModal();
    });
  }
}
