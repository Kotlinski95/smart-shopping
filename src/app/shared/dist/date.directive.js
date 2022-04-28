"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DateDirective = void 0;
var core_1 = require("@angular/core");
var DateDirective = /** @class */ (function () {
    function DateDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.paragraph = this.renderer.createElement('p');
    }
    DateDirective.prototype.mouseEnter = function (eventDate) {
        var _a, _b;
        console.log("mouseenter: ", this.date);
        this.paragraph.innerHTML = ((_a = this.date) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) + " " + ((_b = this.date) === null || _b === void 0 ? void 0 : _b.toLocaleTimeString());
        this.renderer.appendChild(this.element.nativeElement, this.paragraph);
    };
    DateDirective.prototype.mouseLeave = function (eventDate) {
        console.log("mouseleave");
        this.renderer.removeChild(this.element.nativeElement, this.paragraph);
    };
    __decorate([
        core_1.Input()
    ], DateDirective.prototype, "date");
    __decorate([
        core_1.HostListener('mouseenter')
    ], DateDirective.prototype, "mouseEnter");
    __decorate([
        core_1.HostListener('mouseleave')
    ], DateDirective.prototype, "mouseLeave");
    DateDirective = __decorate([
        core_1.Directive({
            selector: '[appDate]'
        })
    ], DateDirective);
    return DateDirective;
}());
exports.DateDirective = DateDirective;
