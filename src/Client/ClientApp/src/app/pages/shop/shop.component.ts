import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Product } from '../../models/Product.model';
import { OrderRequest } from '../../models/requestmodels/orderrequest.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public selectedProduct: Product;
  public error: string;
  public loading: boolean;
  public orderTotal = 1;

  constructor(private orderService: OrderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public productService: ProductService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.productService.getProducts();
  }

  buyNow(content, item) {

    if (this.authenticationService.currentUserValue === null) {
      this.router.navigate(['login']);
    } else {
      this.selectedProduct = item;
      this.modalService.open(content);
    }
  }

  buyConfirm() {
    this.loading = true;

    if (this.orderTotal < 1 || this.orderTotal > this.selectedProduct.stock) {
      this.error = 'Total Products invalid';
      return;
    }

    const orderRequest: OrderRequest = {
      buyerId: this.authenticationService.currentUserValue.id,
      buyerEmail: this.authenticationService.currentUserValue.userName,
      productId: this.selectedProduct.id,
      productName: this.selectedProduct.name,
      totalProducts: this.orderTotal,
    };

    this.orderService.createOrder(orderRequest)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;

          if (data != null) {
            alert('Buy successfull');
            this.modalService.dismissAll();

            // Reload
            this.productService.getProducts();
          } else {
            this.error = 'Buy Error';
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
