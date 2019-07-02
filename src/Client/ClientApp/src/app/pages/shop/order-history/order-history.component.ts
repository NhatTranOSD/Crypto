import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/orderstatus.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orderStatus;

  constructor(public orderService: OrderService) {
    this.orderStatus = OrderStatus;
  }

  ngOnInit() {
    this.orderService.getUserOrders();
  }

  public refundOrder(orderId: string): void {
    this.orderService.refundOrder(orderId)
      .pipe(first())
      .subscribe(
        data => {
          if (data === true) {
            alert('Refund success!');
            this.orderService.getUserOrders();
          } else {
            alert('Refund Failed!');
          }
        },
        error => {
          console.log(error);
        });
  }
}
