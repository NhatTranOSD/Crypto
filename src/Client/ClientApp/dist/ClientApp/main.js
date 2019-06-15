(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/admin/admin.module": [
		"./src/app/pages/admin/admin.module.ts",
		"pages-admin-admin-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_helpers/error.interceptor.ts":
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");





var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                _this.authenticationService.logout();
                location.reload(true);
            }
            var error = err.error.message || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
        }));
    };
    ErrorInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/_helpers/jwt.interceptor.ts":
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");



var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/register/register.component */ "./src/app/pages/register/register.component.ts");
/* harmony import */ var _components_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/wallet/wallet.component */ "./src/app/components/wallet/wallet.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");








var routes = [
    { path: '', component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]] },
    { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]] },
    { path: 'wallet', component: _components_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_6__["WalletComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_7__["AuthGuard"]] },
    { path: 'login', component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'register', component: _pages_register_register_component__WEBPACK_IMPORTED_MODULE_5__["RegisterComponent"] },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body {\r\n    background-color: #666666;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx5QkFBeUI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY2NjY2NjtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <app-header></app-header>\r\n    <!-- main app container -->\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/authentication.service */ "./src/app/services/authentication.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], AppComponent);
    return AppComponent;
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_helpers/jwt.interceptor */ "./src/app/_helpers/jwt.interceptor.ts");
/* harmony import */ var _helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_helpers/error.interceptor */ "./src/app/_helpers/error.interceptor.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/login/login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/home/home.component */ "./src/app/pages/home/home.component.ts");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/register/register.component */ "./src/app/pages/register/register.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/components/header/header.component.ts");
/* harmony import */ var _components_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/wallet/wallet.component */ "./src/app/components/wallet/wallet.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _pages_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
                _pages_home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"],
                _pages_register_register_component__WEBPACK_IMPORTED_MODULE_11__["RegisterComponent"],
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_12__["HeaderComponent"],
                _components_wallet_wallet_component__WEBPACK_IMPORTED_MODULE_13__["WalletComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_5__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_6__["ErrorInterceptor"], multi: true },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/header/header.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/header/header.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/header/header.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/header/header.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <nav class=\"navbar navbar-inverse navbar-dark bg-dark\" *ngIf=\"currentUser\">\r\n        <div class=\"container-fluid\">\r\n            <a class=\"navbar-brand\" routerLink=\"/\">FCoin Trading</a>\r\n            <!-- <ul class=\"nav navbar-nav navbar-right\">\r\n            <img src=\"https://cdn3.iconfinder.com/data/icons/users-23/64/_Male_Profile_Round_Circle_Users-512.png\" height=\"50\" width=\"50\" alt=\"My Profile\" class=\"rounded-circle\">\r\n        </ul> -->\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n                <img src=\"https://cdn3.iconfinder.com/data/icons/users-23/64/_Male_Profile_Round_Circle_Users-512.png\" height=\"50\" width=\"50\" alt=\"My Profile\" class=\"rounded-circle\">\r\n                <li *ngIf=\"true\"><a (click)=\"logout()\" href=\"#\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\r\n                <li *ngIf=\"false\"><a><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n</div>"

/***/ }),

/***/ "./src/app/components/header/header.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    HeaderComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/components/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/wallet/wallet.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/wallet/wallet.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvd2FsbGV0L3dhbGxldC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/wallet/wallet.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/wallet/wallet.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-4\">\r\n        <div class=\"shadow p-3 mb-5 bg-white rounded\">\r\n            <div class=\"card border-0\">\r\n                <img class=\"card-img-top\" src=\"https://cdn3.iconfinder.com/data/icons/users-23/64/_Male_Profile_Round_Circle_Users-512.png\" alt=\"Card image cap\">\r\n                <div class=\"card-body\">\r\n                    <div class=\"form-group\">\r\n                        <button *ngIf=\"wallets == null\" [disabled]=\"loading\" (click)=\"createWallet()\" class=\"btn btn-info btn-sm\">\r\n                            New wallet\r\n                        </button>\r\n                        <img *ngIf=\"loading\" class=\"pl-2\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n                        />\r\n                    </div>\r\n\r\n                    <p class=\"card-text text-truncate\">\r\n                        <!-- Email: My Email -->\r\n                    </p>\r\n                </div>\r\n            </div>\r\n\r\n            <!-- Wallet Currencies -->\r\n            <div *ngIf=\"wallets\" class=\"card border-0\">\r\n                <div class=\"list-group\">\r\n                    <div *ngFor=\"let wallet of wallets\">\r\n                        <a *ngFor=\"let item of wallet.walletCurrencys\" [ngClass]=\"{'bg-light': selectedWallet === wallet}\" class=\"list-group-item list-group-item-action border-0\">\r\n                            <div (click)=\"selectWallet(wallet)\" class=\"row\">\r\n                                <div class=\"col-4\">\r\n                                    <img *ngIf=\"item.currencyType == 0\" class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/9/9a/BTC_Logo.svg\" alt=\"Card image cap\">\r\n                                    <img *ngIf=\"item.currencyType == 1\" class=\"card-img-top\" src=\"https://res.cloudinary.com/teepublic/image/private/s--cf-FFLgW--/t_Preview/b_rgb:fffffe,c_limit,f_jpg,h_630,q_90,w_630/v1513290036/production/designs/2179049_1.jpg\" alt=\"Card image cap\">\r\n                                </div>\r\n                                <div class=\"col-8\">\r\n                                    <h1>{{currencyDisplayName[item.currencyType]}}</h1>Balance: {{item.balance}} {{currencyDisplayName[item.currencyType]}}\r\n                                </div>\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                    <!-- <button (click)=\"createWallet()\" class=\"btn btn-sm btn-success\">Add new Currency</button> -->\r\n                    <div class=\"input-group\">\r\n                        <select [(ngModel)]=\"selectedCurrencyType\" class=\"custom-select\" id=\"inputGroupSelect04\">\r\n                          <option value=\"0\">FCO</option>\r\n                          <option value=\"1\">ETH</option>\r\n                        </select>\r\n                        <div class=\"input-group-append\">\r\n                            <button [disabled]=\"selectedCurrencyType == null\" (click)=\"createWallet()\" class=\"btn btn-outline-secondary\" type=\"button\">Add new Currency</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"col-8\">\r\n        <div class=\"card shadow p-3 mb-5 bg-white rounded border-0\" *ngIf=\"selectedWallet\">\r\n            <div class=\"card-body\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-3\">\r\n                        <img *ngIf=\"selectedWallet.walletCurrencys[0].currencyType == 0\" class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/9/9a/BTC_Logo.svg\" alt=\"Card image cap\">\r\n                        <img *ngIf=\"selectedWallet.walletCurrencys[0].currencyType == 1\" class=\"card-img-top\" src=\"https://res.cloudinary.com/teepublic/image/private/s--cf-FFLgW--/t_Preview/b_rgb:fffffe,c_limit,f_jpg,h_630,q_90,w_630/v1513290036/production/designs/2179049_1.jpg\"\r\n                            alt=\"Card image cap\">\r\n                    </div>\r\n                    <div class=\"col-9\">\r\n                        <p>Address: {{selectedWallet.address}}</p>\r\n                        <p>Currency: {{currencyDisplayName[selectedWallet.walletCurrencys[0].currencyType]}}</p>\r\n                        <p>Balance: {{selectedWallet.walletCurrencys[0].balance}}</p>\r\n                        <p>Contract: 0xd4048296e93478a31777e8d7ef2128e601a0eac5</p>\r\n                    </div>\r\n                </div>\r\n\r\n                <hr>\r\n                <h2>Transaction List</h2>\r\n                <div class=\"list-group bg-light\">\r\n                    <div class=\"list-group-item list-group-item-action\" (click)=\"isCollapsed = !isCollapsed\" [attr.aria-expanded]=\"!isCollapsed\" aria-controls=\"collapseExample\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-2\">\r\n                                <img class=\"card-img-top\" src=\"https://cdn0.iconfinder.com/data/icons/mobile-device/512/dollar-usd-round-keyboard-money-usa-latin-2-512.png\" alt=\"Card image cap\">\r\n                            </div>\r\n                            <div class=\"col-4\">\r\n                                <p class=\"text-left\">Sent tokens </p>\r\n                                <p class=\"text-left\">#24 - 6/10/2019 at 18:06</p>\r\n                            </div>\r\n                            <div class=\"col-3\">\r\n                                <span class=\"badge badge-info\">Confirmed</span>\r\n                            </div>\r\n                            <div class=\"col-3\">\r\n                                -0 ETH\r\n                            </div>\r\n                        </div>\r\n                        <div id=\"collapseExample\" [ngbCollapse]=\"!isCollapsed\">\r\n                            <div class=\"card bg-white border-0\">\r\n                                <div class=\"card-body\">\r\n                                    You can collapse this card by clicking Toggle\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"list-group-item list-group-item-action\" (click)=\"isCollapsed = !isCollapsed\" [attr.aria-expanded]=\"!isCollapsed\" aria-controls=\"collapseExample\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-2\">\r\n                                <img class=\"card-img-top\" src=\"https://upload.wikimedia.org/wikipedia/commons/9/9a/BTC_Logo.svg\" alt=\"Card image cap\">\r\n                            </div>\r\n                            <div class=\"col-4\">\r\n                                <p class=\"text-left\">Sent tokens </p>\r\n                                <p class=\"text-left\">#24 - 6/10/2019 at 18:06</p>\r\n                            </div>\r\n                            <div class=\"col-3\">\r\n                                <span class=\"badge badge-info\">Confirmed</span>\r\n                            </div>\r\n                            <div class=\"col-3\">\r\n                                -0 ETH\r\n                            </div>\r\n                        </div>\r\n                        <div id=\"collapseExample\" [ngbCollapse]=\"!isCollapsed\">\r\n                            <div class=\"card bg-white border-0\">\r\n                                <div class=\"card-body\">\r\n                                    You can collapse this card by clicking Toggle\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/components/wallet/wallet.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/wallet/wallet.component.ts ***!
  \*******************************************************/
/*! exports provided: WalletComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletComponent", function() { return WalletComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_wallet_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/wallet.service */ "./src/app/services/wallet.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _models_WalletCurrency_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/WalletCurrency.model */ "./src/app/models/WalletCurrency.model.ts");





var WalletComponent = /** @class */ (function () {
    function WalletComponent(walletService) {
        this.walletService = walletService;
        this.loading = false;
        this.error = '';
        this.currencyDisplayName = _models_WalletCurrency_model__WEBPACK_IMPORTED_MODULE_4__["CurrencyDisplayName"];
        this.isCollapsed = false;
    }
    WalletComponent.prototype.ngOnInit = function () {
        this.getWalletInfo();
    };
    WalletComponent.prototype.createWallet = function () {
        var _this = this;
        if (this.selectedCurrencyType) {
            this.loading = true;
            this.walletService.createWallet(this.selectedCurrencyType).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
                .subscribe(function (data) {
                _this.loading = false;
                _this.ngOnInit();
            }, function (error) {
                _this.error = error;
                _this.loading = false;
            });
        }
    };
    WalletComponent.prototype.getWalletInfo = function () {
        var _this = this;
        this.loading = true;
        this.walletService.getWalletInfo().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.wallets = data;
            _this.loading = false;
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    WalletComponent.prototype.selectWallet = function (selectedItem) {
        this.selectedWallet = selectedItem;
    };
    WalletComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-wallet',
            template: __webpack_require__(/*! ./wallet.component.html */ "./src/app/components/wallet/wallet.component.html"),
            styles: [__webpack_require__(/*! ./wallet.component.css */ "./src/app/components/wallet/wallet.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_wallet_service__WEBPACK_IMPORTED_MODULE_2__["WalletService"]])
    ], WalletComponent);
    return WalletComponent;
}());



/***/ }),

/***/ "./src/app/models/WalletCurrency.model.ts":
/*!************************************************!*\
  !*** ./src/app/models/WalletCurrency.model.ts ***!
  \************************************************/
/*! exports provided: WalletCurrency, CurrencyDisplayName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletCurrency", function() { return WalletCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyDisplayName", function() { return CurrencyDisplayName; });
var WalletCurrency = /** @class */ (function () {
    function WalletCurrency() {
    }
    return WalletCurrency;
}());

var CurrencyDisplayName = [
    'FCO',
    'ETH'
];


/***/ }),

/***/ "./src/app/pages/home/home.component.css":
/*!***********************************************!*\
  !*** ./src/app/pages/home/home.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".home-main {\r\n    background-color: azure;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx1QkFBdUI7QUFDM0IiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ob21lLW1haW4ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXp1cmU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/pages/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home-main\">\r\n    <!-- <app-wallet></app-wallet> -->\r\n</div>"

/***/ }),

/***/ "./src/app/pages/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_test_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/test.service */ "./src/app/services/test.service.ts");



var HomeComponent = /** @class */ (function () {
    function HomeComponent(testService) {
        this.testService = testService;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/pages/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/pages/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_test_service__WEBPACK_IMPORTED_MODULE_2__["TestService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/pages/login/login.component.css":
/*!*************************************************!*\
  !*** ./src/app/pages/login/login.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body {\r\n    background-color: #666666;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHlCQUF5QjtBQUM3QiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NjY2NjY7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/login/login.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 offset-md-3\">\r\n\r\n    <div style=\"height: 30%\">\r\n        <img src=\"https://toocrypto.com/wp-content/uploads/2018/07/fcoin-logo.png\" class=\"img-rounded\" height=\"100%\" width=\"100%\" alt=\"Cinque Terre\">\r\n    </div>\r\n    <div class=\"card border-0 shadow p-3 mb-5 bg-white rounded\">\r\n        <div class=\"card-body\">\r\n            <h2 class=\"text-center\">Login</h2>\r\n            <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"username\">User Name/Email</label>\r\n                    <input [email]=true type=\"email\" (change)=\"inputChanges()\" formControlName=\"username\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\" />\r\n                    <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.username.errors.required\">Username is required</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"password\">Password</label>\r\n                    <input type=\"password\" (change)=\"inputChanges()\" formControlName=\"password\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\" />\r\n                    <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.password.errors.required\">Password is required</div>\r\n                    </div>\r\n                </div>\r\n                <p class=\"text-sm-right\"><a href=\"/register\">Regiser new account</a></p>\r\n                <div class=\"form-group\">\r\n                    <button [disabled]=\"loading || submitDisabled\" class=\"btn btn-primary\">Login</button>\r\n                    <img *ngIf=\"loading\" class=\"pl-2\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n                    />\r\n                </div>\r\n                <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.submitDisabled = true;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.inputChanges = function () {
        if (this.f.username.value !== '' && this.f.password.value !== '') {
            this.submitDisabled = false;
        }
        else {
            this.submitDisabled = true;
        }
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            if (data.succeeded) {
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this.error = 'Invalid UserName or PassWord';
            }
            _this.loading = false;
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/pages/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/register/register.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/register/register.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/register/register.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/register/register.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height: 20%\">\r\n\r\n</div>\r\n<div class=\"card border-0 shadow p-3 mb-5 bg-white rounded\">\r\n    <div class=\"card-body\">\r\n        <h2>Register</h2>\r\n        <form [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\r\n            <div class=\"form-group\">\r\n                <label for=\"firstName\">First Name</label>\r\n                <input type=\"text\" (change)=\"inputChanges()\" formControlName=\"firstName\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.firstName.errors }\" />\r\n                <div *ngIf=\"submitted && f.firstName.errors\" class=\"invalid-feedback\">\r\n                    <div *ngIf=\"f.firstName.errors.required\">First Name is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"lastName\">Last Name</label>\r\n                <input type=\"text\" (change)=\"inputChanges()\" formControlName=\"lastName\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.lastName.errors }\" />\r\n                <div *ngIf=\"submitted && f.lastName.errors\" class=\"invalid-feedback\">\r\n                    <div *ngIf=\"f.lastName.errors.required\">First Name is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"email\">Email</label>\r\n                <input [email]=\"true\" type=\"email\" (change)=\"inputChanges()\" formControlName=\"email\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" />\r\n                <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\r\n                    <div *ngIf=\"f.email.errors.required\">Email is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"passWord\">Password</label>\r\n                <input type=\"passWord\" (change)=\"inputChanges()\" formControlName=\"passWord\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': submitted && f.passWord.errors }\" />\r\n                <div *ngIf=\"submitted && f.passWord.errors\" class=\"invalid-feedback\">\r\n                    <div *ngIf=\"f.passWord.errors.required\">Password is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <button [disabled]=\"loading || submitDisabled\" class=\"btn btn-primary\">Register</button>\r\n                <img *ngIf=\"loading\" class=\"pl-2\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n                />\r\n            </div>\r\n            <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/register/register.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/register/register.component.ts ***!
  \******************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/authentication.service */ "./src/app/services/authentication.service.ts");






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, route, router, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.submitted = false;
        this.submitDisabled = true;
        this.error = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            passWord: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.inputChanges = function () {
        if (this.f.email.value !== '' &&
            this.f.passWord.value !== '' &&
            this.f.firstName.value !== '' &&
            this.f.lastName.value !== '') {
            this.submitDisabled = false;
        }
        else {
            this.submitDisabled = true;
        }
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        var registerModel = {
            email: this.f.email.value,
            passWord: this.f.passWord.value,
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value
        };
        this.loading = true;
        this.authenticationService.register(registerModel)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            if (data.succeeded) {
                _this.router.navigate(['login']);
            }
            else {
                _this.error = data.errors[0].description;
            }
            _this.loading = false;
        }, function (error) {
            _this.error = error;
            _this.loading = false;
        });
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/pages/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/pages/register/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/services/authentication.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/authentication.service.ts ***!
  \****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.register = function (userRegister) {
        if (!userRegister) {
            return;
        }
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].authApi + "api/v1/Identity/Create", userRegister)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) {
            return user;
        }));
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var requestmodel = {
            userName: username,
            passWord: password,
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].authApi + "api/v1/Identity/Login", requestmodel)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token && user.succeeded === true) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/services/test.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/test.service.ts ***!
  \******************************************/
/*! exports provided: TestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestService", function() { return TestService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");




var TestService = /** @class */ (function () {
    function TestService(http) {
        this.http = http;
        // this.click();
    }
    TestService.prototype.click = function () {
        this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].authApi + "api/Values/1").subscribe(function (data) {
            console.log(data);
        });
    };
    TestService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TestService);
    return TestService;
}());



/***/ }),

/***/ "./src/app/services/wallet.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/wallet.service.ts ***!
  \********************************************/
/*! exports provided: WalletService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletService", function() { return WalletService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/authentication.service */ "./src/app/services/authentication.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var WalletService = /** @class */ (function () {
    function WalletService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.currentUser = authenticationService.currentUserValue;
    }
    WalletService.prototype.createWallet = function (currencytype) {
        var requestmodel = {
            userId: this.currentUser.id,
            currencyType: currencytype,
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].walletApi + "api/v1/Wallet/Create", requestmodel)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            // login successful if there's a jwt token in the response
            return data;
        }));
    };
    WalletService.prototype.getWalletInfo = function () {
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].walletApi + "api/v1/Wallet/" + this.currentUser.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            // login successful if there's a jwt token in the response
            return data;
        }));
    };
    WalletService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]])
    ], WalletService);
    return WalletService;
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
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    // authApi: 'https://localhost:5001/',
    // walletApi: 'https://localhost:5002/',
    // shoppingApi: 'https://localhost:5003/',
    authApi: 'https://crypto-securityservice.azurewebsites.net/',
    walletApi: 'https://cryptowalletservice.azurewebsites.net/',
    shoppingApi: 'https://crypto-shoppingservice.azurewebsites.net/',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


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
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\OSD-Projects\Crypto\src\Client\ClientApp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map