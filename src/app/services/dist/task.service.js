"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskService = void 0;
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/internal/BehaviorSubject");
var TaskService = /** @class */ (function () {
    //private tasksDoneObservable = new BehaviorSubject<Array<Task>>([]); //BehaviorSubject requires initial value, it could be event empty object.
    function TaskService() {
        this.taskList = [];
        //private taskDone: Task[] = [];
        // BehaviorSubject enable to subscribe this array after our initial array is fullfilled in constructor.
        this.tasksListObservable = new BehaviorSubject_1.BehaviorSubject(this.taskList);
        this.tasksListObservable.next(this.taskList);
    }
    TaskService.prototype.add = function (task) {
        this.taskList.push(task);
        this.tasksListObservable.next(this.taskList);
        console.log("TASK ADDED: ", this.taskList);
    };
    TaskService.prototype.remove = function (task) {
        this.taskList = this.taskList.filter(function (element) { return element !== task; });
        this.tasksListObservable.next(this.taskList);
    };
    TaskService.prototype.done = function (task) {
        // this.remove(task);
        // this.taskDone.push(task);
        // console.log("task done: ", task);
        // this.tasksDoneObservable.next(this.taskDone);
        task.end = new Date().toLocaleString();
        task.isDone = true;
        var list = this.tasksListObservable.getValue();
        this.tasksListObservable.next(list);
    };
    TaskService.prototype.calcDone = function (list) {
        return list.length;
    };
    TaskService.prototype.getTasksListObservable = function () {
        return this.tasksListObservable.asObservable();
    };
    TaskService = __decorate([
        core_1.Injectable()
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
