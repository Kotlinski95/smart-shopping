import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    component: SignUpComponent,
  },
];
@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    RouterModule.forChild(routes),
    TranslateModule,
    EffectsModule.forFeature([Effects.AuthEffects]),
    StoreModule.forFeature('Authorization', Reducers.AuthReducer),
  ],
})
export class SignUpModule {}
