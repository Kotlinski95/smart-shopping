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
    this.modalState.next({ ...this.modalState.value, isOpen: true });
  }
  public hideModal(): void {
    this.modalState.next({ ...this.modalState.value, isOpen: false });
  }

  public createModal(modalParams: ModalParams): void {
    this.modalState.next({ ...this.modalState.value, params: modalParams });
  }
  public setModalContent(content: string): void {
    this.modalParams.next({ ...this.modalParams.value, content: content });
  }
}
