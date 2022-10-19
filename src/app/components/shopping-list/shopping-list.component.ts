import { ModalParams } from './../../../../../.history/smart-shopping/src/app/shared/interfaces/modal_20221015082747';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  isTaskListLoaded$: Observable<boolean> = new Observable();
  subscripion: Subscription = new Subscription();
  // private confirmationModal: ModalParams;

  constructor(
    private authService: AuthService,
    private tasksService: TaskService,
    private modalService: ModalService
  ) {
    this.subscripion.add(
      this.tasksService.gettasksListObservableFb().subscribe()
    );
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.isTaskListLoaded$ = this.tasksService.isTaskListLoaded();
  }

  ngOnDestroy(): void {
    this.subscripion.unsubscribe();
  }

  showModal(): void {
    this.modalService.createModal({
      title: 'string',
      content: 'string',
      btnClose: true,
      btnCloseLabel: 'string',
      btnConfirm: true,
      btnConfirmLabel: 'string',
    });
    this.modalService.showModal();
  }
}
