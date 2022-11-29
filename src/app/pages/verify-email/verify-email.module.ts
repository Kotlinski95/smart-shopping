import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as Reducers from 'src/app/state/reducers';
import * as Effects from 'src/app/state/effects';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailComponent,
  },
];
@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    TranslateModule,
    EffectsModule.forFeature([Effects.AuthEffects]),
    StoreModule.forFeature('Authorization', Reducers.AuthReducer),
  ],
})
export class VerifyEmailModule {}
