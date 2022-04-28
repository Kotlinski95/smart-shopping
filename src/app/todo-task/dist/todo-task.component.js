"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TodoTaskComponent = void 0;
var core_1 = require("@angular/core");
var TodoTaskComponent = /** @class */ (function () {
    function TodoTaskComponent(tasksService) {
        var _this = this;
        this.tasksService = tasksService;
        /* @Input() tasksList: Array<string> = [];  not necessary with services */
        /* @Output() emitDone = new EventEmitter<string>();   not necessary with services */
        /* @Output() emitRemove = new EventEmitter<string>();  not necessary with services */
        this.tasksList = [];
        this.tasksService.getTasksListObservable().subscribe(function (tasks) {
            _this.tasksList = tasks;
        });
    }
    TodoTaskComponent.prototype.ngOnInit = function () {
    };
    TodoTaskComponent.prototype.remove = function (task) {
        // this.emitRemove.emit(task);  not necessary with services
        this.tasksService.remove(task);
    };
    TodoTaskComponent.prototype.done = function (task) {
        // this.emitDone.emit(task);  not necessary with services
        task.end = new Date();
        this.tasksService.done(task);
    };
    TodoTaskComponent.prototype.getColor = function () {
        return this.tasksList.length > 1 ? 'Red' : 'Green';
    };
    TodoTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-todo-task',
            templateUrl: './todo-task.component.html',
            styleUrls: ['./todo-task.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], TodoTaskComponent);
    return TodoTaskComponent;
}());
exports.TodoTaskComponent = TodoTaskComponent;
