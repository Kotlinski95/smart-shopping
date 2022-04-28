import { Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.scss']
})
export class DoneTaskComponent implements OnInit, OnChanges {

  // @Input() tasksDone: Array<string> = [] - not necessary with services
  tasksDone: Task[] = []
  constructor(private tasksService: TaskService) {
    this.tasksService.getTasksDoneObservable().subscribe((tasksDone: Task[]) => {
      this.tasksDone = tasksDone;
    })
   }
  /* Uruchamia si na początku, przed ngOnInit
    * Sprawdza czy zmienily si zbindowane pola komponentu
    * Musi zmienić sie referencja!
  */
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges - uruchomione! - #1");
    console.log(changes);
  }
  /*
    * Uruchamia sie jeden raz podczas inicjalizacji komponentu
    * Uruchamia sie po konstruktorze i po ngOnChange
  */
  ngOnInit(): void {
    console.log("ngOnInit - uruchomione! - #2");
  }
  /*
    * Uruchamia sie przy kazdej zmianie, wywołaniu eventu etc.
  */
  ngDoCheck(): void {
    console.log("ngDoCheck - uruchomione! - #3");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy - uruchomione! - #8");
  }

  calcDone(list: Array<Task>): number {
    return list.length;
  }

}
