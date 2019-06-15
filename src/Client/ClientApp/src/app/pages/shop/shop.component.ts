import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public selectedProduct: Product;

  constructor(public productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.productService.getProducts();
  }

  buyNow(content, item) {
    this.selectedProduct = item;
    this.modalService.open(content);
  }

}
