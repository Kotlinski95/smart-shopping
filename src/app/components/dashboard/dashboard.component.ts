import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  faSignOutAlt = faSignOutAlt;
  constructor(public authService: AuthService) {}
}
