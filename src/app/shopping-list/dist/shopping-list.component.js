"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShoppingListComponent = void 0;
var core_1 = require("@angular/core");
var ShoppingListComponent = /** @class */ (function () {
    function ShoppingListComponent() {
        this.title = "Shopping List";
        this.taskList = [];
        this.taskDone = [];
    }
    ShoppingListComponent.prototype.ngOnInit = function () {
        console.log("#addTaskRef: ", this.AddTaskComponent, "#inputField: ", this.input);
    };
    /* Main app logic */
    ShoppingListComponent.prototype.add = function (task) {
        this.taskList.push(task);
        console.log("#addTaskRef: ", this.AddTaskComponent, "#inputField: ", this.input);
    };
    ShoppingListComponent.prototype.remove = function (task) {
        this.taskList = this.taskList.filter(function (element) { return element !== task; });
        console.log("task removed: ", task);
    };
    ShoppingListComponent.prototype.done = function (task) {
        this.remove(task);
        this.taskDone.push(task);
        console.log("task done: ", task);
    };
    ShoppingListComponent.prototype.calcDone = function (list) {
        return list.length;
    };
    __decorate([
        core_1.ViewChild('addTaskRef')
    ], ShoppingListComponent.prototype, "AddTaskComponent");
    __decorate([
        core_1.ViewChild('inputField2')
    ], ShoppingListComponent.prototype, "input");
    ShoppingListComponent = __decorate([
        core_1.Component({
            selector: 'app-shopping-list',
            templateUrl: './shopping-list.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            styleUrls: ['./shopping-list.component.scss']
        })
    ], ShoppingListComponent);
    return ShoppingListComponent;
}());
exports.ShoppingListComponent = ShoppingListComponent;
