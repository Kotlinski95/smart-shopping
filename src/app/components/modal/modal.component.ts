import { Component, HostListener } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modal$ = this.modalService.getModalState();
  @HostListener('document:keydown.escape') onKeydownHandler() {
    this.modalService.hideModal();
  }

  constructor(private modalService: ModalService) {}

  public closeModal(): void {
    this.modalService.hideModal();
  }
}
