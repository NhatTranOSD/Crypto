import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Product } from '../../models/Product.model';
import { OrderRequest } from '../../models/requestmodels/orderrequest.model';
import { WalletService } from '../../services/wallet.service';

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
    private tokenService: TokenService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public productService: ProductService,
    private walletService: WalletService,
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
      txHash: '',
      buyerId: this.authenticationService.currentUserValue.id,
      buyerEmail: this.authenticationService.currentUserValue.userName,
      productId: this.selectedProduct.id,
      productName: this.selectedProduct.name,
      totalProducts: this.orderTotal,
    };

    this.tokenService.trading = true;
    this.modalService.dismissAll();
    alert('transactions are being made. Please wait and check order history');

    // Transfer token to admin
    this.tokenService.transferTokenToAdmin(this.selectedProduct.price * this.orderTotal)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;

          if (data && data.txHash !== null) {
            orderRequest.txHash = data.txHash;
            // Create Order
            this.loading = true;
            this.orderService.createOrder(orderRequest)
              .pipe(first())
              .subscribe(
                data => {
                  console.log('result:', data);
                  if (data != null) {
                    alert('Buy successfull');

                    // Reload
                    this.productService.getProducts();
                    this.walletService.getWalletInfo();
                  } else {
                    this.error = 'Buy Error';
                  }

                  this.tokenService.trading = false;

                },
                error => {
                  this.error = error;
                  this.tokenService.trading = false;
                });
          } else {
            this.error = 'Buy Error';
            this.tokenService.trading = false;
          }

        },
        error => {
          this.error = error;
          console.log(error);
          this.loading = false;
        });
  }

}
