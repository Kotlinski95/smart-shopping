"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddTaskComponent = void 0;
var core_1 = require("@angular/core");
var AddTaskComponent = /** @class */ (function () {
    /* @Output() emitTask = new EventEmitter<string>();  not necessary with service */
    function AddTaskComponent(tasksTaskService) {
        this.tasksTaskService = tasksTaskService;
        this.newTask = "";
    }
    AddTaskComponent.prototype.ngOnInit = function () {
    };
    AddTaskComponent.prototype.add = function (inputField) {
        console.log("Inputfield: ", inputField);
        var task = { name: this.newTask, created: new Date() };
        // this.emitTask.emit(this.newTask); not necessary with service
        this.tasksTaskService.add(task);
        this.newTask = "";
    };
    AddTaskComponent = __decorate([
        core_1.Component({
            selector: 'app-add-task',
            templateUrl: './add-task.component.html',
            styleUrls: ['./add-task.component.scss']
        })
    ], AddTaskComponent);
    return AddTaskComponent;
}());
exports.AddTaskComponent = AddTaskComponent;
