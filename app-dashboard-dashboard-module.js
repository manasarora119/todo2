(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-dashboard-dashboard-module"],{

/***/ "./src/app/dashboard/components/dashboard.component.html":
/*!***************************************************************!*\
  !*** ./src/app/dashboard/components/dashboard.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row fixed-page-title\">\n  <div class=\"col-sm-6 col-xs-12\">\n    <h4 class=\"page_title\">TO DO LIST</h4>\n  </div>\n</div>\n\n<div class=\"row body-content\">\n  <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n    <div class=\"panel panel-default\">\n   \n      <mat-form-field >\n        <mat-label>Autosize textarea</mat-label>\n        <textarea matInput\n        [(ngModel)]=\"noteValue\"\n       \n                  cdkTextareaAutosize\n                  #autosize=\"cdkTextareaAutosize\"\n                  cdkAutosizeMinRows=\"1\"\n                  cdkAutosizeMaxRows=\"5\"></textarea>\n      </mat-form-field>\n\n\n\n\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/dashboard/components/dashboard.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/dashboard/components/dashboard.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dashboard {\n  color: #fff; }\n\n.textarea {\n  margin: 10px;\n  resize: none; }\n\n.mat-form-field {\n  width: 100%;\n  padding: 10px; }\n"

/***/ }),

/***/ "./src/app/dashboard/components/dashboard.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/dashboard/components/dashboard.component.ts ***!
  \*************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_core_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/core/services */ "./src/app/core/services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(route, toastr, broadcast, router) {
        this.route = route;
        this.toastr = toastr;
        this.broadcast = broadcast;
        this.router = router;
        this.noteValue = "Hello";
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Init");
        this.route.paramMap.subscribe(function (params) {
            _this.id = Number(params['params']['id']);
            console.log(params['params']['id'], " parmasssss");
            var data = JSON.parse(localStorage.getItem("data")) || [];
            var checkUsername = function (obj) { return obj.id === _this.id; };
            if (data.some(checkUsername)) {
                var obj = data.find(function (o, i) {
                    if (o.id === _this.id) {
                        _this.noteValue = o.value;
                        return true; // stop searching
                    }
                });
            }
        });
        this.emailBroadcastListner = this.broadcast.listen().subscribe(function (res) {
            setTimeout(function () {
                if (res.event.name === 'save') {
                    _this.router.navigate(["/dashboard"]);
                    var data_1 = JSON.parse(localStorage.getItem("data")) || [];
                    var checkUsername = function (obj) { return obj.id === _this.id; };
                    if (data_1.some(checkUsername)) {
                        var obj = data_1.find(function (o, i) {
                            if (o.id === _this.id) {
                                // this.noteValue = o.value;
                                data_1[i] = { id: _this.id, value: _this.noteValue, time: new Date().valueOf() };
                                return true; // stop searching
                            }
                        });
                    }
                    else {
                        data_1.push({
                            id: _this.id,
                            time: new Date().valueOf(),
                            value: _this.noteValue || "Hello"
                        });
                    }
                    localStorage.setItem("data", JSON.stringify(data_1));
                    _this.noteValue = "";
                    _this.broadcast.publish({
                        name: 'getdata',
                    });
                }
                if (res.event.name === 'add') {
                    var data_2 = JSON.parse(localStorage.getItem("data")) || [];
                    console.log(JSON.parse(localStorage.getItem("counter")), "counter", res.event.name, _this.id);
                    var checkUsername = function (obj) { return obj.id === _this.id; };
                    if (data_2.some(checkUsername)) {
                        var obj = data_2.find(function (o, i) {
                            if (o.id === _this.id) {
                                // this.noteValue = o.value;
                                data_2[i] = { id: _this.id, value: _this.noteValue, time: new Date().valueOf() };
                                return true; // stop searching
                            }
                        });
                    }
                    else {
                        data_2.push({
                            id: _this.id - 1,
                            time: new Date().valueOf(),
                            value: _this.noteValue || "Hello"
                        });
                    }
                    localStorage.setItem("data", JSON.stringify(data_2));
                    console.log("data", data_2);
                    // this.id = this.id + 1
                    _this.router.navigate(["/dashboard/" + _this.id]);
                    _this.noteValue = "";
                    _this.broadcast.publish({
                        name: 'getdata',
                    });
                }
            }, 0);
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        // this.broadcast.unsubscribeListener(this.broadcastListener);
        this.emailBroadcastListner.unsubscribe();
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-dashboard",
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/components/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/dashboard/components/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"],
            _app_core_services__WEBPACK_IMPORTED_MODULE_3__["BroadcastService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/components/index.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/components/index.ts ***!
  \***********************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/dashboard/components/dashboard.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return _dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"]; });




/***/ }),

/***/ "./src/app/dashboard/dashboard.module.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.module.ts ***!
  \***********************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var dlv_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dlv-material */ "./node_modules/dlv-material/fesm5/dlv-material.js");
/* harmony import */ var _dashboard_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.routes */ "./src/app/dashboard/dashboard.routes.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/app/dashboard/components/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _dashboard_routes__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutesModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                dlv_material__WEBPACK_IMPORTED_MODULE_2__["DLVMaterialModule"]
            ],
            declarations: [
                _components__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"]
            ],
            providers: []
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.routes.ts":
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.routes.ts ***!
  \***********************************************/
/*! exports provided: DashboardRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutesModule", function() { return DashboardRoutesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/app/dashboard/components/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { AuthGuardService } from '@app/core/services';

var dashboardRoutesModule = [
    {
        path: ':id',
        component: _components__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"],
        data: { title: 'Dashboard' }
    }
];
var DashboardRoutesModule = /** @class */ (function () {
    function DashboardRoutesModule() {
    }
    DashboardRoutesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(dashboardRoutesModule)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], DashboardRoutesModule);
    return DashboardRoutesModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-dashboard-dashboard-module.js.map