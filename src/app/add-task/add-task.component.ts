import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { Firestore, collectionData, collection, doc as Doc2, addDoc } from '@angular/fire/firestore';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTask: string = '';
  collectionFb: any;
  myDoc: any;

  firestre: any;
  /* @Output() emitTask = new EventEmitter<string>();  not necessary with service */
  constructor(
    private tasksTaskService: TaskService,
    firestore: Firestore,

  ) {
    this.collectionFb = collection(firestore, 'tasks');
    this.firestre = firestore;
    const unsub = onSnapshot(doc(firestore, 'tasks', 'tasksList'), (doc) => {
      console.log('Current data: ', doc.data());
    });
  }

  ngOnInit(): void {}

  add(inputField: HTMLInputElement) {
    console.log('Inputfield: ', inputField);
    const task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    // this.emitTask.emit(this.newTask); not necessary with service
    this.tasksTaskService.add(task);
    this.newTask = '';

    setDoc(doc(this.firestre, 'tasks', `${task.name}`), task);
    // addDoc(this.collectionFb, {...task, id: task.name});

  }
}
