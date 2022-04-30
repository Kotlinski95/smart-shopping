import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {
  @Input()
  public date: string | undefined;

  private paragraph;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');

  }

  @HostListener('mouseenter') mouseEnter(eventDate: Event) {
    console.log("mouseenter: ", this.date);
    this.paragraph.innerHTML = `${this.date}`;
    this.renderer.appendChild(this.element.nativeElement, this.paragraph);
  }

  @HostListener('mouseleave') mouseLeave(eventDate: Event) {
    console.log("mouseleave");
    this.renderer.removeChild(this.element.nativeElement, this.paragraph);
  }

}
