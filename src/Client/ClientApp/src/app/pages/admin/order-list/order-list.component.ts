import { Component, OnInit } from '@angular/core';
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

}
