import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../models/orderstatus.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orderStatus;
  public amount: number;
  public refundTotal = 1;
  public orderRefund: any;

  constructor(public orderService: OrderService,
              private modalService: NgbModal) {
    this.orderStatus = OrderStatus;
  }

  ngOnInit() {
    this.orderService.getUserOrders();
  }

  public refundOrder(content, order): void {

    this.orderRefund = order;
    this.modalService.open(content);
  }
  public refundConfirm(orderId: number) {

    this.modalService.dismissAll();
    this.orderService.refundOrder(orderId, this.refundTotal)
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
