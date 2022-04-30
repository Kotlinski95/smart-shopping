"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoneTaskComponent = void 0;
var core_1 = require("@angular/core");
var DoneTaskComponent = /** @class */ (function () {
    function DoneTaskComponent(tasksService) {
        var _this = this;
        this.tasksService = tasksService;
        // @Input() tasksDone: Array<string> = [] - not necessary with services
        this.tasksDone = [];
        // this.tasksService.getTasksDoneObservable().subscribe((tasksDone: Task[]) => {
        //   this.tasksDone = tasksDone;
        // })
        this.tasksService.getTasksListObservable().subscribe(function (tasksDone) {
            _this.tasksDone = tasksDone.filter(function (task) { return task.isDone === true; });
        });
    }
    /* Uruchamia si na początku, przed ngOnInit
      * Sprawdza czy zmienily si zbindowane pola komponentu
      * Musi zmienić sie referencja!
    */
    DoneTaskComponent.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChanges - uruchomione! - #1");
        console.log(changes);
    };
    /*
      * Uruchamia sie jeden raz podczas inicjalizacji komponentu
      * Uruchamia sie po konstruktorze i po ngOnChange
    */
    DoneTaskComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit - uruchomione! - #2");
    };
    /*
      * Uruchamia sie przy kazdej zmianie, wywołaniu eventu etc.
    */
    DoneTaskComponent.prototype.ngDoCheck = function () {
        console.log("ngDoCheck - uruchomione! - #3");
    };
    DoneTaskComponent.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy - uruchomione! - #8");
    };
    DoneTaskComponent.prototype.calcDone = function (list) {
        return list.length;
    };
    DoneTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-done-task',
            templateUrl: './done-task.component.html',
            styleUrls: ['./done-task.component.scss']
        })
    ], DoneTaskComponent);
    return DoneTaskComponent;
}());
exports.DoneTaskComponent = DoneTaskComponent;
