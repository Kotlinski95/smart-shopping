import { Component, OnInit} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Firestore, collection} from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

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
  constructor(
    private tasksTaskService: TaskService,
    firestore: Firestore,

  ) {
    this.collectionFb = collection(firestore, 'tasks');
    this.firestre = firestore;
  }

  ngOnInit(): void {}

  add(inputField: HTMLInputElement) {
    console.log('Inputfield: ', inputField);
    const task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    this.tasksTaskService.add(task);
    this.newTask = '';

    setDoc(doc(this.firestre, 'tasks', `${task.name}`), task);
  }
}
