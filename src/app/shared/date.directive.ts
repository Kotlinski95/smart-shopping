import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDate]',
})
export class DateDirective {
  @Input()
  public date: string | undefined;

  private paragraph;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }

  @HostListener('mouseenter') mouseEnter() {
    this.paragraph.innerHTML = `${this.date}`;
    this.renderer.appendChild(this.element.nativeElement, this.paragraph);
  }

  @HostListener('mouseleave') mouseLeave() {
    this.renderer.removeChild(this.element.nativeElement, this.paragraph);
  }
}
