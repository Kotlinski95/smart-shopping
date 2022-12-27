import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { SsrSupportService } from 'src/app/shared/services/ssr-support.service';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public scroll$: Observable<any> | undefined;
  private showScroll: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public showScroll$ = this.showScroll.asObservable();
  constructor(
    private viewport: ViewportScroller,
    private ssrSupportService: SsrSupportService
  ) {}

  public ngOnInit(): void {
    this.scroll$ = fromEvent(
      this.ssrSupportService.getDocument(),
      'scroll'
    ).pipe(debounceTime(500));

    this.subscriptions.add(this.scroll$.subscribe(() => this.showOnScroll()));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public scrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  public showOnScroll(): void {
    const innerHeight =
      this.ssrSupportService.getWindowView() &&
      this.ssrSupportService.getWindowView()?.innerHeight
        ? this.ssrSupportService.getWindowView()!.innerHeight
        : Infinity;
    this.showScroll.next(this.viewport.getScrollPosition()[1] > innerHeight);
  }
}
