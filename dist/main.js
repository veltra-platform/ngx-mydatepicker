(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pagecontent {\n  margin: 10px 300px;\n}\n\n.maintitle {\n  background-color: #EEE;\n  height: 180px;\n  border-bottom: 1px solid #CCC;\n  background: linear-gradient(to right, rgba(44, 83, 158, 1) 0%, rgba(44, 83, 158, 1) 100%);\n  text-align: center;\n}\n\n.maintitle div:first-child {\n  display: inline-block;\n  color: #FFF;\n  font-size: 46px;\n  font-weight: bold;\n  margin-top: 48px;\n}\n\n.maintitle div:last-child {\n  color: #FFF;\n  font-size: 18px;\n}\n\n.normalmode {\n  margin-bottom: 340px;\n}\n\n.inlinemode {\n  margin-bottom: 340px;\n}\n\n.tabcontainer {\n  display: table;\n  width: 100%;\n  border-spacing: 2px;\n}\n\n.tab {\n  display: table-cell;\n  border-radius: 4px;\n  width: 33.33333%;\n  padding: 8px 0;\n  text-align: center;\n}\n\n.activetab {\n  background-color: #2C539E;\n  color: #FFF;\n}\n\n.inactivetab {\n  color: #2C539E;\n}\n\n.inactivetab:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.pagetext {\n  margin: 20px 0;\n}\n\nhr {\n  margin: 6px 0;\n  border: none;\n  height: 1px;\n  background-image: linear-gradient(to right, #DDD, #555, #DDD);\n}\n\n@media screen and (max-width: 1200px) {\n  .pagecontent {\n    margin: 10px 40px;\n  }\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"maintitle\">\n    <div>ngx-mydatepicker</div>\n    <div>Angular date picker</div>\n</div>\n<div class=\"pagecontent\">\n    <div class=\"tabcontainer\">\n        <div class=\"tab activetab\">ngx-mydatepicker</div>\n        <div class=\"tab inactivetab\" (click)=\"toMyDatePicker()\">mydatepicker</div>\n        <div class=\"tab inactivetab\" (click)=\"toDateRangePicker()\">mydaterangepicker</div>\n    </div>\n\n    <div>\n        <hr/>\n        <div class=\"pagetext\">Attribute directive date picker. You have full control to the input box and the buttons of the input box. Otherwise this is similar as mydatepicker. The date picker below has bootstrap 3.3.7 styled input box with glyphicons.</div>\n        <div class=\"normalmode\">\n            <sample-date-picker-ngmodel>loading...</sample-date-picker-ngmodel>\n        </div>\n    </div>\n\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: MyDatePickerApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyDatePickerApp", function() { return MyDatePickerApp; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyDatePickerApp = /** @class */ (function () {
    function MyDatePickerApp() {
        console.log('constructor: MyDatePickerApp');
    }
    MyDatePickerApp.prototype.toMyDatePicker = function () {
        window.open('http://kekeh.github.io/mydatepicker', '_self');
    };
    MyDatePickerApp.prototype.toDateRangePicker = function () {
        window.open('http://kekeh.github.io/mydaterangepicker', '_self');
    };
    MyDatePickerApp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-mydatepicker-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            moduleId: module.i,
        }),
        __metadata("design:paramtypes", [])
    ], MyDatePickerApp);
    return MyDatePickerApp;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _sample_date_picker_ngmodel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sample-date-picker-ngmodel */ "./src/app/sample-date-picker-ngmodel/index.ts");
/* harmony import */ var ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-mydatepicker */ "./node_modules/ngx-mydatepicker/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["MyDatePickerApp"], _sample_date_picker_ngmodel__WEBPACK_IMPORTED_MODULE_5__["SampleDatePickerNgModel"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_6__["NgxMyDatePickerModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["MyDatePickerApp"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/sample-date-picker-ngmodel/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/sample-date-picker-ngmodel/index.ts ***!
  \*****************************************************/
/*! exports provided: SampleDatePickerNgModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sample_date_picker_ngmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample-date-picker-ngmodel */ "./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SampleDatePickerNgModel", function() { return _sample_date_picker_ngmodel__WEBPACK_IMPORTED_MODULE_0__["SampleDatePickerNgModel"]; });




/***/ }),

/***/ "./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.html":
/*!****************************************************************************!*\
  !*** ./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n  .border {\n    padding: 4px;\n    border-radius: 4px;\n    float: right;\n    width: 100%;\n  }\n  .okDate {\n    color: #3c764d;\n    background-color: #dff0d6;\n    border: 1px solid #d6e9c2;\n  }\n  .invalidDate {\n    color: #a94444;\n    background-color: #f1dede;\n    border: 1px solid #ebccd2;\n  }\n\n  .settingstable {\n    width: 100%;\n    border: none;\n  }\n  .settingstable tr td {\n    width: 50%;\n    border: none;\n  }\n  .buttonrow {\n    margin: 15px 0;\n  }\n  ::-ms-clear {\n    display: none;\n  }\n  .btnicon {\n    top: 2px;\n  }\n</style>\n\n<div>\n  <table class=\"settingstable\">\n    <tr>\n      <td>\n        <label>\n          <span>Show today button:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowTodayButton($event.currentTarget.checked)\"\n                 [checked]=\"true\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Open selector top of input field:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\"\n                 (change)=\"onOpenSelectorTopOfInput($event.currentTarget.checked)\" [checked]=\"false\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Align selector right:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onAlignSelectorRight($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Show selector arrow:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowSelectorArrow($event.currentTarget.checked)\"\n                 [checked]=\"true\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Disable today:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onDisableToday($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Mark today:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onMarkToday($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Highlight today:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onHighlightToday($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Show week numbers:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowWeekNumbers($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Allow selection only current month:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onAllowSelectionOnlyCurrentMonth($event.currentTarget.checked)\" [checked]=\"true\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Append selector to body:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onAppendSelectorToBody($event.currentTarget.checked)\" [checked]=\"false\">\n        </label>\n      </td>\n    </tr>\n\n    <tr>\n      <td>\n        <label>\n          <span style=\"margin-right: 10px\">Selector size:</span>\n          <span>\n              <select style=\"padding: 2px;cursor: pointer;font-size: 11px;min-width: 60px;\" (change)=\"onSelectorSize($event.target.value)\">\n                  <option *ngFor=\"let s of selectorSizes\">{{s}}</option>\n              </select>\n          </span>\n        </label>\n      </td>\n      <td>\n\n      </td>\n    </tr>\n\n\n    <a href=\"https://github.com/kekeh/ngx-mydatepicker#options-attribute\">all options...</a>\n\n    <div class=\"buttonrow\">\n      <button style=\"cursor: pointer\" type=\"button\" (click)=\"dp.toggleCalendar();$event.stopPropagation()\">Toggle</button>\n      <button style=\"cursor: pointer\" type=\"button\" (click)=\"dp.openCalendar();$event.stopPropagation()\">Open</button>\n      <button style=\"cursor: pointer\" type=\"button\" (click)=\"dp.closeCalendar();$event.stopPropagation()\">Close</button>\n      <button style=\"cursor: pointer\" type=\"button\" (click)=\"clearDate()\">Clear</button>\n    </div>\n\n  </table>\n\n  <table style=\"width: 100%\">\n    <tr>\n      <td style=\"vertical-align: top; width: 220px\">\n        <form>\n          <div class=\"input-group\">\n\n            <input class=\"form-control\" style=\"float:none\" placeholder=\"Select a date\" ngx-mydatepicker name=\"mydate\"\n                   [(ngModel)]=\"model\" [options]=\"myDatePickerOptions\" [defaultMonth]=\"defMonth\" #dp=\"ngx-mydatepicker\"\n                   (dateChanged)=\"onDateChanged($event)\" (calendarViewChanged)=\"onCalendarViewChanged($event)\"\n                   (calendarToggle)=\"onCalendarToggle($event)\" (inputFieldChanged)=\"onInputFieldChanged($event)\"\n                   autocomplete=\"off\"/>\n\n            <span class=\"input-group-btn\">\n              <button type=\"button\" class=\"btn btn-default\" (click)=\"dp.clearDate();$event.stopPropagation()\"><i class=\"glyphicon glyphicon-remove btnicon\"></i></button>\n              <button type=\"button\" class=\"btn btn-default\" (click)=\"dp.toggleCalendar();$event.stopPropagation()\"><i class=\"glyphicon glyphicon-calendar btnicon\"></i></button>\n            </span>\n\n          </div>\n        </form>\n      </td>\n      <td style=\"vertical-align: top;padding-left: 20px\">\n        <div *ngIf=\"inputText !== ''\" class=\"border\" [ngClass]=\"{'okDate': validDate, 'invalidDate': !validDate}\">\n          <span *ngIf=\"validDate\">{{selectedTextNormal}}</span>\n          <span *ngIf=\"!validDate\">Invalid date</span>\n        </div>\n      </td>\n  </table>\n\n</div>\n\n"

/***/ }),

/***/ "./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.ts ***!
  \**************************************************************************/
/*! exports provided: SampleDatePickerNgModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleDatePickerNgModel", function() { return SampleDatePickerNgModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-mydatepicker */ "./node_modules/ngx-mydatepicker/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SampleDatePickerNgModel = /** @class */ (function () {
    function SampleDatePickerNgModel() {
        this.myDatePickerOptions = {
            dateFormat: 'd mmm yyyy',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            markCurrentDay: true,
            alignSelectorRight: false,
            openSelectorTopOfInput: false,
            minYear: 1900,
            maxYear: 2200,
            showSelectorArrow: true,
            disableDates: [],
            highlightDates: [],
            showWeekNumbers: false,
            markDates: [],
            selectorHeight: '232px',
            selectorWidth: '252px',
            allowSelectionOnlyInCurrentMonth: true,
            appendSelectorToBody: false
        };
        this.selectedTextNormal = '';
        this.validDate = false;
        this.inputText = "";
        this.model = ''; // not initial date set
        this.defMonth = '';
        this.selectorSizes = new Array('252*232', '220*200', '290*260');
    }
    SampleDatePickerNgModel.prototype.clearDate = function () {
        this.ngxdp.clearDate();
    };
    SampleDatePickerNgModel.prototype.onSelectorSize = function (size) {
        var copy = this.getCopyOfOptions();
        if (size === '252*232') {
            copy.selectorHeight = '232px';
            copy.selectorWidth = '252px';
            this.myDatePickerOptions = copy;
        }
        else if (size === '220*200') {
            copy.selectorHeight = '200px';
            copy.selectorWidth = '220px';
            this.myDatePickerOptions = copy;
        }
        else {
            copy.selectorHeight = '260px';
            copy.selectorWidth = '290px';
            this.myDatePickerOptions = copy;
        }
    };
    SampleDatePickerNgModel.prototype.onShowTodayButton = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showTodayBtn = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onOpenSelectorTopOfInput = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.openSelectorTopOfInput = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onAlignSelectorRight = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onShowSelectorArrow = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showSelectorArrow = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onDisableToday = function (checked) {
        var d = new Date();
        var copy = this.getCopyOfOptions();
        copy.disableDates = checked ? [{ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }] : [];
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onMarkToday = function (checked) {
        var d = new Date();
        var copy = this.getCopyOfOptions();
        copy.markDates = checked ? [{ dates: [{ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }], color: 'green' }] : [];
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onHighlightToday = function (checked) {
        var d = new Date();
        var copy = this.getCopyOfOptions();
        copy.highlightDates = checked ? [{ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }] : [];
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onShowWeekNumbers = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onAllowSelectionOnlyCurrentMonth = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.allowSelectionOnlyInCurrentMonth = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.onAppendSelectorToBody = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.appendSelectorToBody = checked;
        this.myDatePickerOptions = copy;
    };
    SampleDatePickerNgModel.prototype.getCopyOfOptions = function () {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    };
    SampleDatePickerNgModel.prototype.ngOnInit = function () {
        console.log('onInit(): SampleDatePickerNgModel');
    };
    // callbacks
    SampleDatePickerNgModel.prototype.onDateChanged = function (event) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.validDate = true;
            this.inputText = event.formatted;
        }
        else {
            this.selectedTextNormal = '';
        }
    };
    SampleDatePickerNgModel.prototype.onInputFieldChanged = function (event) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
        this.validDate = event.valid;
        this.inputText = event.value;
    };
    SampleDatePickerNgModel.prototype.onCalendarToggle = function (event) {
        console.log('onCalendarToggle(): Reason: ', event);
    };
    SampleDatePickerNgModel.prototype.onCalendarViewChanged = function (event) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dp'),
        __metadata("design:type", ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_1__["NgxMyDatePickerDirective"])
    ], SampleDatePickerNgModel.prototype, "ngxdp", void 0);
    SampleDatePickerNgModel = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'sample-date-picker-ngmodel',
            template: __webpack_require__(/*! ./sample-date-picker-ngmodel.html */ "./src/app/sample-date-picker-ngmodel/sample-date-picker-ngmodel.html"),
            moduleId: module.i,
        }),
        __metadata("design:paramtypes", [])
    ], SampleDatePickerNgModel);
    return SampleDatePickerNgModel;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/keijo/code/ghpages/ngx-mydatepicker/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map