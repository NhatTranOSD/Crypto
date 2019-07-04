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
import { Paging } from '../../models/Paging.model';
import { WalletService } from '../../services/wallet.service';
import { NotifyService } from './../../services/notify.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public selectedProduct: Product;
  public products: any;
  public paging: Paging;
  public error: string;
  public loading: boolean;
  public orderTotal = 1;
  public total = 0;
  public totalPage = 0;
  public pageNumber = 1;
  public pageSize = 5;
  public limit: number[] = [5, 10, 15, 20];
  selectedSize: number = 5;

  constructor(private orderService: OrderService,
    private tokenService: TokenService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public productService: ProductService,
    private walletService: WalletService,
    private modalService: NgbModal,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.getProductLists();
  }

  getProductLists(): void {
    this.loading = true;
    this.productService.getProductLists({ pageNumber: this.pageNumber, pageSize: this.pageSize }).subscribe(
      data => {
        this.products = data.product;
        this.total = data.paging.totalItems;
        this.totalPage = data.paging.totalPages;
      },
      error => {
        console.log(error);
      });
  }

  selected() {
    this.pageSize = this.selectedSize;
    this.pageNumber = 1;
    this.getProductLists();
  }

  goToPage(n: number): void {
    this.pageNumber = n;
    this.getProductLists();
  }

  onNext(): void {
    this.pageNumber++;
    this.getProductLists();
  }

  onPrev(): void {
    this.pageNumber--;
    this.getProductLists();
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

    if (this.orderTotal < 1 || this.orderTotal > this.selectedProduct.stock) {
      this.error = 'Total Products invalid';
      return;
    }

    if (this.tokenService.trading === true) {
      this.notifyService.showNotification('info', 'Please wait for previous transaction complete! Thanks');
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

    this.notifyService.showNotification('warning', 'Transactions are being made. Please wait and check order history');

    // Transfer token to admin
    this.tokenService.transferTokenToAdmin(this.selectedProduct.price * this.orderTotal)
      .pipe(first())
      .subscribe(
        data => {

          if (data != null) {
            this.modalService.dismissAll();
            // Reload
            this.productService.getProducts();
            if (data && data.txHash !== null) {
              orderRequest.txHash = data.txHash;
              // Create Order
              this.loading = true;
              this.orderService.createOrder(orderRequest)
                .pipe(first())
                .subscribe(
                  data => {
                    if (data != null) {
                      this.notifyService.showNotification('success', 'Buy successfull! Please check order history.');
                      // Reload
                      this.productService.getProducts();
                      this.walletService.getWalletInfo();
                    } else {
                      this.notifyService.showNotification('error', 'Buy Product Failed.');
                    }

                    this.tokenService.trading = false;

                  },
                  error => {
                    this.error = error;
                    this.tokenService.trading = false;
                  });
            } else {
              this.notifyService.showNotification('error', 'Buy failed! Please check your balance.');
              this.tokenService.trading = false;
            }
          }
        },
        error => {
          this.error = error;
          console.log(error);
          this.loading = false;
        });
    this.reset();
  }

  // Reset error and total
  private reset() {
    this.orderTotal = 1;
    this.error = '';
  }

}
