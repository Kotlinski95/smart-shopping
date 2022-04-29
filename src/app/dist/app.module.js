"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var shopping_list_component_1 = require("./shopping-list/shopping-list.component");
var forms_1 = require("@angular/forms");
var add_task_component_1 = require("./add-task/add-task.component");
var todo_task_component_1 = require("./todo-task/todo-task.component");
var done_task_component_1 = require("./done-task/done-task.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var checked_directive_1 = require("./shared/checked.directive");
var date_directive_1 = require("./shared/date.directive");
var transform_task_pipe_1 = require("./shared/transform-task.pipe");
var sort_name_pipe_1 = require("./shared/sort-name.pipe");
var http_service_1 = require("./services/http.service");
var http_1 = require("@angular/common/http");
/* Decorator NgModule - information about components, directives and servises in our application */
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                shopping_list_component_1.ShoppingListComponent,
                add_task_component_1.AddTaskComponent,
                todo_task_component_1.TodoTaskComponent,
                done_task_component_1.DoneTaskComponent,
                checked_directive_1.CheckedDirective,
                date_directive_1.DateDirective,
                transform_task_pipe_1.TransformTaskPipe,
                sort_name_pipe_1.SortNamePipe,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule
            ],
            providers: [http_service_1.HttpService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
