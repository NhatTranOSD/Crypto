(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-admin-admin-module"],{

/***/ "./src/app/models/orderstatus.model.ts":
/*!*********************************************!*\
  !*** ./src/app/models/orderstatus.model.ts ***!
  \*********************************************/
/*! exports provided: OrderStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderStatus", function() { return OrderStatus; });
var OrderStatus = [
    'None',
    'Processing',
    'Completed',
    'Refunding',
    'Refunded'
];


/***/ }),

/***/ "./src/app/pages/admin/admin-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/admin/admin-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _catalog_catalog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./catalog/catalog.component */ "./src/app/pages/admin/catalog/catalog.component.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin.component */ "./src/app/pages/admin/admin.component.ts");
/* harmony import */ var _order_list_order_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./order-list/order-list.component */ "./src/app/pages/admin/order-list/order-list.component.ts");






var routes = [
    {
        path: '', component: _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"], children: [
            {
                path: 'catalog',
                component: _catalog_catalog_component__WEBPACK_IMPORTED_MODULE_3__["CatalogComponent"],
            },
            {
                path: 'orders',
                component: _order_list_order_list_component__WEBPACK_IMPORTED_MODULE_5__["OrderListComponent"],
            }
        ]
    },
    { path: '**', redirectTo: '' }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/admin/admin.component.css":
/*!*************************************************!*\
  !*** ./src/app/pages/admin/admin.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FkbWluL2FkbWluLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/admin/admin.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/admin/admin.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<admin-header></admin-header>\r\n<hr>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/pages/admin/admin.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/admin/admin.component.ts ***!
  \************************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AdminComponent = /** @class */ (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/pages/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/pages/admin/admin.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin/admin.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/admin/admin.module.ts ***!
  \*********************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/pages/admin/admin-routing.module.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin.component */ "./src/app/pages/admin/admin.component.ts");
/* harmony import */ var _catalog_catalog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./catalog/catalog.component */ "./src/app/pages/admin/catalog/catalog.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header/header.component */ "./src/app/pages/admin/header/header.component.ts");
/* harmony import */ var _order_list_order_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./order-list/order-list.component */ "./src/app/pages/admin/order-list/order-list.component.ts");









var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_admin_component__WEBPACK_IMPORTED_MODULE_5__["AdminComponent"], _catalog_catalog_component__WEBPACK_IMPORTED_MODULE_6__["CatalogComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_7__["HeaderComponent"], _order_list_order_list_component__WEBPACK_IMPORTED_MODULE_8__["OrderListComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _admin_routing_module__WEBPACK_IMPORTED_MODULE_4__["AdminRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
            ],
            bootstrap: [_admin_component__WEBPACK_IMPORTED_MODULE_5__["AdminComponent"]]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/pages/admin/catalog/catalog.component.css":
/*!***********************************************************!*\
  !*** ./src/app/pages/admin/catalog/catalog.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FkbWluL2NhdGFsb2cvY2F0YWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/admin/catalog/catalog.component.html":
/*!************************************************************!*\
  !*** ./src/app/pages/admin/catalog/catalog.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\r\n    <button (click)=\"createOpen(editcontent)\" class=\"btn btn-sm btn-info\">Add product</button>\r\n</div>\r\n<br>\r\n<table class=\"table table-striped bg-white\">\r\n    <thead>\r\n        <tr>\r\n            <th scope=\"col\">#</th>\r\n            <th scope=\"col\">Logo</th>\r\n            <th scope=\"col\">Name</th>\r\n            <th scope=\"col\">Description</th>\r\n            <th scope=\"col\">Price</th>\r\n            <th scope=\"col\">stock</th>\r\n            <th scope=\"col\"></th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr *ngFor=\"let product of productService.products; index as i\">\r\n            <th scope=\"row\">{{ i + 1 }}</th>\r\n            <td>\r\n                <img [src]=\"product.pictureUri\" class=\"mr-2\" style=\"width: 30px\">\r\n            </td>\r\n            <td>{{ product.name }}</td>\r\n            <td>{{ product.description }}</td>\r\n            <td>{{ product.price | number }} FCO</td>\r\n            <th>{{ product.stock | number }}</th>\r\n            <td>\r\n                <button (click)=\"editOpen(editcontent, product)\" type=\"button\" class=\"btn btn-sm btn-info\">Edit </button>|\r\n                <button (click)=\"deleteComfirm(product, comfirmcontent)\" type=\"button\" class=\"btn btn-sm btn-danger\">Delete</button>\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n\r\n\r\n<!-- Create/Update Modal -->\r\n<ng-template #editcontent let-modal>\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\" id=\"modal-basic-title\">{{productFormTitle}}</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <form>\r\n            <form [formGroup]=\"productForm\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"name\">Product Name</label>\r\n                    <input [name]=true type=\"text\" formControlName=\"name\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': formSubmitted && f.name.errors }\" />\r\n                    <div *ngIf=\"formSubmitted && f.name.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.name.errors.required\">Product Name is required</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"price\">Price</label>\r\n                    <input type=\"number\" formControlName=\"price\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': formSubmitted && f.price.errors }\" />\r\n                    <div *ngIf=\"formSubmitted && f.price.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.price.errors.required\">Product description is required</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"stock\">Stock</label>\r\n                    <input type=\"number\" formControlName=\"stock\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': formSubmitted && f.stock.errors }\" />\r\n                    <div *ngIf=\"formSubmitted && f.stock.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.stock.errors.required\">Product stock is required</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"description\">Description</label>\r\n                    <input type=\"text\" formControlName=\"description\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': formSubmitted && f.description.errors }\" />\r\n                    <div *ngIf=\"formSubmitted && f.description.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.description.errors.required\">Product description is required</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"pictureUri\">Product PictureUri</label>\r\n                    <input type=\"text\" formControlName=\"pictureUri\" class=\"form-control\" [ngClass]=\"{ 'is-invalid': formSubmitted && f.pictureUri.errors }\" />\r\n                    <div *ngIf=\"formSubmitted && f.pictureUri.errors\" class=\"invalid-feedback\">\r\n                        <div *ngIf=\"f.pictureUri.errors.required\">Product pictureUri is required</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <div class=\"modal-footer\">\r\n                        <img *ngIf=\"formLoading\" class=\"pl-2\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n                        />\r\n                        <button [disabled]=\"formLoading\" type=\"button\" class=\"btn btn-outline-info\" (click)=\"formSave()\">Save</button>\r\n                        <button [disabled]=\"formLoading\" type=\"button\" class=\"btn btn-outline-dark\" (click)=\"closeModal('CreateClose')\">Close</button>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"createError\" class=\"alert alert-danger\">{{createError}}</div>\r\n            </form>\r\n        </form>\r\n    </div>\r\n    <!-- <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-outline-info\" (click)=\"modal.close('Save click')\">Save</button>\r\n        <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"modal.close('Close click')\">Close</button>\r\n    </div> -->\r\n</ng-template>\r\n\r\n<!-- Product Modal -->\r\n<ng-template #comfirmcontent let-modal>\r\n    <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\" id=\"modal-basic-title\">{{productFormTitle}}</h4>\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        Do you want to delete this product?\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-outline-info\" (click)=\"deleteComfirmed()\">Yes</button>\r\n        <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"modal.close('Close click')\">No</button>\r\n    </div>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/pages/admin/catalog/catalog.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/admin/catalog/catalog.component.ts ***!
  \**********************************************************/
/*! exports provided: CatalogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogComponent", function() { return CatalogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/product.service */ "./src/app/services/product.service.ts");






var CatalogComponent = /** @class */ (function () {
    function CatalogComponent(productService, 
    // tslint:disable-next-line:align
    modalService, 
    // tslint:disable-next-line:align
    formBuilder) {
        this.productService = productService;
        this.modalService = modalService;
        this.formBuilder = formBuilder;
    }
    CatalogComponent.prototype.ngOnInit = function () {
        this.productService.getProducts();
    };
    Object.defineProperty(CatalogComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.productForm.controls; },
        enumerable: true,
        configurable: true
    });
    CatalogComponent.prototype.formSave = function () {
        if (this.productFormType === 'Create') {
            this.createSave();
        }
        else if ('Edit') {
            this.editSave();
        }
    };
    CatalogComponent.prototype.createOpen = function (content) {
        // Init Create form
        this.productFormTitle = 'Create Product';
        this.productFormType = 'Create';
        this.productForm = this.formBuilder.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            stock: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            pictureUri: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.modalService.open(content);
    };
    CatalogComponent.prototype.createSave = function () {
        var _this = this;
        this.formSubmitted = true;
        this.formLoading = true;
        // stop here if form is invalid
        if (this.productForm.invalid) {
            this.formLoading = false;
            return;
        }
        var requestModel = {
            name: this.f.name.value,
            description: this.f.description.value,
            price: this.f.price.value,
            stock: this.f.stock.value,
            pictureUri: this.f.pictureUri.value,
        };
        this.productService.createProduct(requestModel).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            if (data) {
                _this.modalService.dismissAll();
                _this.productService.getProducts();
            }
            _this.formLoading = false;
            _this.formSubmitted = false;
            _this.createError = '';
        }, function (error) {
            _this.createError = error;
            _this.formLoading = false;
            _this.formSubmitted = false;
        });
    };
    CatalogComponent.prototype.editOpen = function (content, item) {
        this.editingProduct = item;
        this.productFormTitle = 'Edit Product';
        this.productFormType = 'Edit';
        this.productForm = this.formBuilder.group({
            name: [item.name, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            description: [item.description, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            price: [item.price, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            stock: [item.stock, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            pictureUri: [item.pictureUri, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.modalService.open(content);
    };
    CatalogComponent.prototype.editSave = function () {
        var _this = this;
        this.formSubmitted = true;
        this.formLoading = true;
        // stop here if form is invalid
        if (this.productForm.invalid) {
            this.formLoading = false;
            return;
        }
        var requestModel = {
            name: this.f.name.value,
            description: this.f.description.value,
            price: this.f.price.value,
            stock: this.f.stock.value,
            pictureUri: this.f.pictureUri.value,
        };
        this.productService.updateProduct(this.editingProduct.id, requestModel).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            if (data) {
                _this.modalService.dismissAll();
                _this.productService.getProducts();
            }
            _this.formLoading = false;
            _this.formSubmitted = false;
            _this.createError = '';
        }, function (error) {
            _this.createError = error;
            _this.formLoading = false;
            _this.formSubmitted = false;
        });
    };
    CatalogComponent.prototype.deleteComfirm = function (deletingProduct, comfirmContent) {
        this.deletingProduct = deletingProduct;
        this.modalService.open(comfirmContent);
    };
    CatalogComponent.prototype.deleteComfirmed = function () {
        var _this = this;
        this.productService.deleteProduct(this.deletingProduct.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (data) {
            if (data === true) {
                _this.productService.getProducts();
            }
        });
        this.modalService.dismissAll();
    };
    CatalogComponent.prototype.closeModal = function (reason) {
        this.modalService.dismissAll();
        this.formSubmitted = false;
    };
    CatalogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-catalog',
            template: __webpack_require__(/*! ./catalog.component.html */ "./src/app/pages/admin/catalog/catalog.component.html"),
            styles: [__webpack_require__(/*! ./catalog.component.css */ "./src/app/pages/admin/catalog/catalog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_5__["ProductService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], CatalogComponent);
    return CatalogComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin/header/header.component.css":
/*!*********************************************************!*\
  !*** ./src/app/pages/admin/header/header.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FkbWluL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/admin/header/header.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/admin/header/header.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"bg-white\">\r\n    <ul class=\"nav justify-content-center\">\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" routerLink=\"/admin/catalog\">Catalog</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" routerLink=\"/admin/catalog\">Transactions</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" routerLink=\"/admin/orders\">Orders</a>\r\n        </li>\r\n    </ul>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/admin/header/header.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/admin/header/header.component.ts ***!
  \********************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            // tslint:disable-next-line:component-selector
            selector: 'admin-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/pages/admin/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/pages/admin/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin/order-list/order-list.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/pages/admin/order-list/order-list.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FkbWluL29yZGVyLWxpc3Qvb3JkZXItbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/admin/order-list/order-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/pages/admin/order-list/order-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Orders</h3>\n<hr>\n<table class=\"table table-striped bg-white\">\n  <thead>\n    <tr>\n      <th scope=\"col\">#</th>\n      <th scope=\"col\">CreatedDate</th>\n      <th scope=\"col\">UpdatedDate</th>\n      <th scope=\"col\">BuyerEmail</th>\n      <th scope=\"col\">ProductName</th>\n      <th scope=\"col\">TotalProducts</th>\n      <th scope=\"col\">TotalPayment</th>\n      <th scope=\"col\">OrderStatus</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let order of orderService.orders; index as i\">\n      <th scope=\"row\">{{ i + 1 }}</th>\n      <td>{{ order.createdDate | date: 'MM/dd/yyyy hh:mm:ss' }}</td>\n      <td>{{ order.updatedDate | date: 'MM/dd/yyyy hh:mm:ss' }}</td>\n      <td>{{ order.buyerEmail }}</td>\n      <td>{{ order.productName }}</td>\n      <td>{{ order.totalProducts | number}}</td>\n      <td>{{ order.totalPayment | number }} <span class=\"badge badge-primary\">{{order.currency}}</span></td>\n      <td><span class=\"badge badge-success\" [ngClass]=\"{'badge-danger': order.orderStatus === 3}\">{{ orderStatus[order.orderStatus] }}</span></td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/pages/admin/order-list/order-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/admin/order-list/order-list.component.ts ***!
  \****************************************************************/
/*! exports provided: OrderListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderListComponent", function() { return OrderListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_order_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/order.service */ "./src/app/services/order.service.ts");
/* harmony import */ var _models_orderstatus_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/orderstatus.model */ "./src/app/models/orderstatus.model.ts");




var OrderListComponent = /** @class */ (function () {
    function OrderListComponent(orderService) {
        this.orderService = orderService;
        this.orderStatus = _models_orderstatus_model__WEBPACK_IMPORTED_MODULE_3__["OrderStatus"];
    }
    OrderListComponent.prototype.ngOnInit = function () {
        this.orderService.getOrders();
    };
    OrderListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order-list',
            template: __webpack_require__(/*! ./order-list.component.html */ "./src/app/pages/admin/order-list/order-list.component.html"),
            styles: [__webpack_require__(/*! ./order-list.component.css */ "./src/app/pages/admin/order-list/order-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_order_service__WEBPACK_IMPORTED_MODULE_2__["OrderService"]])
    ], OrderListComponent);
    return OrderListComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-admin-admin-module.js.map