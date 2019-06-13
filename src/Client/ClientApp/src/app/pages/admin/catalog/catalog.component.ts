import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService } from '../../../services/product.service';
import { ProductRequest } from '../../../models/requestmodels/productrequest.model';
import { Product } from '../../../models/Product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public closeResult: string;

  public productForm: FormGroup;
  public productFormTitle: string;
  public productFormType: string;
  public formSubmitted: boolean;
  public formLoading: boolean;
  public createError: '';

  public editingProduct: Product;
  public deletingProduct: Product;

  constructor(private productService: ProductService,
    // tslint:disable-next-line:align
    private modalService: NgbModal,
    // tslint:disable-next-line:align
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.productService.getProducts();
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  public formSave(): void {

    if (this.productFormType === 'Create') {
      this.createSave();
    } else if ('Edit') {
      this.editSave();
    }

  }

  createOpen(content) {
    // Init Create form

    this.productFormTitle = 'Create Product';
    this.productFormType = 'Create';

    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      pictureUri: ['', Validators.required]
    });

    this.modalService.open(content);
  }

  createSave() {
    this.formSubmitted = true;
    this.formLoading = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      this.formLoading = false;
      return;
    }

    const requestModel: ProductRequest = {
      name: this.f.name.value,
      description: this.f.description.value,
      price: this.f.price.value,
      pictureUri: this.f.pictureUri.value,
    };

    this.productService.createProduct(requestModel).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.modalService.dismissAll();
            this.productService.getProducts();
          }
          this.formLoading = false;
          this.formSubmitted = false;
        },
        error => {
          this.createError = error;
          this.formLoading = false;
          this.formSubmitted = false;
        });
  }

  editOpen(content, item: Product) {
    this.editingProduct = item;
    this.productFormTitle = 'Edit Product';
    this.productFormType = 'Edit';

    this.productForm = this.formBuilder.group({
      name: [item.name, Validators.required],
      description: [item.description, Validators.required],
      price: [item.price, Validators.required],
      pictureUri: [item.pictureUri, Validators.required]
    });

    this.modalService.open(content);
  }

  editSave() {
    this.formSubmitted = true;
    this.formLoading = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      this.formLoading = false;
      return;
    }

    const requestModel: ProductRequest = {
      name: this.f.name.value,
      description: this.f.description.value,
      price: this.f.price.value,
      pictureUri: this.f.pictureUri.value,
    };

    this.productService.updateProduct(this.editingProduct.id, requestModel).pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.modalService.dismissAll();
            this.productService.getProducts();
          }
          this.formLoading = false;
        },
        error => {
          this.createError = error;
          this.formLoading = false;
          this.formSubmitted = false;
        });
  }

  deleteComfirm(deletingProduct: Product, comfirmContent): void {
    this.deletingProduct = deletingProduct;
    this.modalService.open(comfirmContent);
  }

  deleteComfirmed(): void {
    this.productService.deleteProduct(this.deletingProduct.id).pipe(first())
      .subscribe(
        data => {
          if (data === true) {
            this.productService.getProducts();
          }
        }
      );

    this.modalService.dismissAll();
  }

  public closeModal(reason: any): void {
    this.modalService.dismissAll();
    this.formSubmitted = false;
  }

}
