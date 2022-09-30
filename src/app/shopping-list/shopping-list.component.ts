import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { HttpService } from 'src/app/services/http.service';
import { HttpErrorResponse } from '@angular/common/http'
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent {
  title = 'Shopping List';

  @ViewChild('addTaskRef')
  AddTaskComponent!: AddTaskComponent;
  constructor(private HttpService: HttpService) {
  }
  @ViewChild('inputField2') input!: ElementRef;
  ngOnInit(): void {
    this.HttpService.getData()
      .pipe(retry(3))
      .subscribe({
        next: (posts) => console.log('getData: ', posts),
        error: (error: HttpErrorResponse) => console.error(error),
      });
    this.HttpService.getSpecificData(1).subscribe((posts) => {
      // console.log('getSpecificData: ', posts);
    });
    this.HttpService.getDataById(1).subscribe((posts) => {
      // console.log('getDataById: ', posts);
    });
  }
}
