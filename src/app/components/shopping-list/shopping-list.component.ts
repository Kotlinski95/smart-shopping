import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskService } from 'src/app/shared/services/task.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [TaskService],
})
export class ShoppingListComponent {
  title = 'Shopping List';
  constructor(private authService: AuthService) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
