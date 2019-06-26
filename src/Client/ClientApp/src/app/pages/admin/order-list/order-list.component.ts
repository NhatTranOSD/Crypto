import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { OrderService } from '../../../services/order.service';
import { TokenService } from '../../../services/token.service';
import { OrderStatus } from '../../../models/orderstatus.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orderStatus;

  constructor(public orderService: OrderService,
    private tokenService: TokenService) {
    this.orderStatus = OrderStatus;
  }

  ngOnInit() {
    this.orderService.getOrders();
  }

  public acceptRefund(orderId: string): void {

    if(this.tokenService.trading === true){
      alert('Please wait to complete privious approve!');
      return;
    }

    this.tokenService.trading = true;
    this.orderService.acceptRefundOrder(orderId)
      .pipe(first())
      .subscribe(
        data => {
          if (data === true) {
            alert('Approve success!');
            this.ngOnInit();
          } else {
            alert('Approve Failed!');
          }
          this.tokenService.trading = false;
        },
        error => {
          console.log(error);
          this.tokenService.trading = false;
        });
  }

  public refuseRefund(orderId: string): void {
    this.orderService.refuseRefundOrder(orderId)
      .pipe(first())
      .subscribe(
        data => {
          if (data === true) {
            alert('Refuse success!');
            this.ngOnInit();
          } else {
            alert('Refuse Failed!');
          }
        },
        error => {
          console.log(error);
        });
  }

}
