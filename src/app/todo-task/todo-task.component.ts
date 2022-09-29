import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import {
  Firestore,
  collectionData,
  collection,
  doc as Doc2,
  addDoc,
} from '@angular/fire/firestore';
import { doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoTaskComponent implements OnInit {
  tasksList: Task[] = [];
  collectionFb: any;
  myDoc: any;

  firestre: any;

  constructor(private tasksService: TaskService, firestore: Firestore) {
    this.tasksService.gettasksListObservableFb().subscribe((tasks: Task[]) => {
      this.tasksList = [...tasks].filter((task: Task) => {
        return task.isDone === false;
      });
    });
    this.collectionFb = collection(firestore, 'tasks');
    this.firestre = firestore;
  }

  ngOnInit(): void {}

  remove(task: Task) {
    this.tasksService.remove(task);
    deleteDoc(doc(this.firestre, 'tasks', `${task.name}`));
  }
  done(task: Task) {
    this.tasksService.done(task);
    task.end = new Date().toLocaleString();
    task.isDone = true;
    updateDoc(doc(this.firestre, 'tasks', `${task.name}`), { ...task });
  }
  getColor(): string {
    return this.tasksList.length > 1 ? 'Red' : 'Green';
  }
}
