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
var task_service_1 = require("src/app/services/task.service");
var operators_1 = require("rxjs/operators");
var ShoppingListComponent = /** @class */ (function () {
    function ShoppingListComponent(HttpService) {
        this.HttpService = HttpService;
        this.title = "Shopping List";
    }
    ShoppingListComponent.prototype.ngOnInit = function () {
        this.HttpService.getData().pipe(operators_1.retry(3)).subscribe({
            next: function (posts) { return console.log("getData: ", posts); },
            error: function (error) { return console.error(error); }
        });
        this.HttpService.getSpecificData(1).subscribe(function (posts) {
            console.log("getSpecificData: ", posts);
        });
        this.HttpService.getDataById(1).subscribe(function (posts) {
            console.log("getDataById: ", posts);
        });
        console.log("#addTaskRef: ", this.AddTaskComponent, "#inputField: ", this.input);
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
            styleUrls: ['./shopping-list.component.scss'],
            providers: [task_service_1.TaskService]
        })
    ], ShoppingListComponent);
    return ShoppingListComponent;
}());
exports.ShoppingListComponent = ShoppingListComponent;
