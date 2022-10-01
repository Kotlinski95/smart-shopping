import { Component, ViewEncapsulation } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent {
  title = 'Shopping List';
}
