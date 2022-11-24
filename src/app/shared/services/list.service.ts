import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListsActions } from 'src/app/state/actions';
import { List } from '../interfaces/list';
import { getListState } from 'src/app/state/selectors/lists.selectors';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { DocumentData } from 'firebase/firestore';
import { config } from '../../config';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private initList: List = { name: '', tasks: [] };
  private currentList: BehaviorSubject<List> = new BehaviorSubject(
    this.initList
  );
  public currentList$ = this.currentList.asObservable();
  constructor(
    private store: Store,
    private authService: AuthService,
    private fireBaseService: FirebaseService,
    private localService: LocalService
  ) {
    this.store.select(getListState)?.subscribe(list => {
      this.currentList.next(list);
    });
  }

  public setActualSelectedList(list: List): void {
    this.store.dispatch(ListsActions.setList({ list: list }));
  }

  public getListObservableFb(): Observable<Array<List>> {
    if (this.authService.isLoggedIn) {
      return this.fireBaseService
        .getFireBaseCollectionData(
          `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`
        )
        .pipe(
          map((data: DocumentData[]) => {
            return <List[]>[...data];
          })
        );
    } else {
      return this.localService.ListsObservableLocal$;
    }
  }

  public addList(list: List, alert = true): void {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.addCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${list.name}`,
        list,
        alert
      );
    } else {
      this.localService.addList(list, alert);
    }
  }

  public createList(list: List): void {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.createCollection(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${list.name}/${list.name}`,
        list.name,
        true
      );
    }
    this.addList(list, false);
  }

  public removeList(list: List, showAlert = true) {
    if (this.authService.isLoggedIn) {
      this.fireBaseService.removeCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${config.firebase.collectionName}`,
        `${list.name}`,
        showAlert
      );
      this.fireBaseService.removeCollectionData(
        `${config.firebase.usersPrefix}/${this.authService.actualUser.uid}/${list.name}`,
        `${list.name}`,
        showAlert
      );
    } else {
      this.localService.removeList(list, showAlert);
    }
  }
}
