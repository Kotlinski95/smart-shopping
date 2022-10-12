import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent {
  @ViewChild('alert') alert!: ElementRef;
  hide(): void {
    this.alert.nativeElement.classList.add('hide');
  }
}
