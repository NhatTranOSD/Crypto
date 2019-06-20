import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/orderstatus.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public orderStatus;

  constructor(public orderService: OrderService) {
    this.orderStatus = OrderStatus;
  }

  ngOnInit() {
    this.orderService.getOrders();
  }

  public acceptRefund(orderId: string): void {
    this.orderService.acceptRefundOrder(orderId)
      .pipe(first())
      .subscribe(
        data => {
          if (data === true) {
            alert('Accept success!');
            this.orderService.getUserOrders();
          } else {
            alert('Accept Failed!');
          }
        },
        error => {
          console.log(error);
        });
  }

  public refuseRefund(orderId: string): void {
    this.orderService.refuseRefundOrder(orderId)
    .pipe(first())
    .subscribe(
      data => {
        if (data === true) {
          alert('Refuse success!');
          this.orderService.getUserOrders();
        } else {
          alert('Refuse Failed!');
        }
      },
      error => {
        console.log(error);
      });
  }

}
