import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  faRedoAlt = faRedoAlt;
  constructor(public authService: AuthService) {}
}
