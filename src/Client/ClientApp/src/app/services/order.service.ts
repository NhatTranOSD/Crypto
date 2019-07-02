import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ChartDataSets } from 'chart.js';

import { AuthenticationService } from '../services/authentication.service';
import { ProductRequest } from '../models/requestmodels/productrequest.model';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { OrderRequest } from '../models/requestmodels/orderrequest.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders: Order[];
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Product Orders' },
  ];

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  public getOrders(): any {
    return this.http.get<Order[]>(`${environment.shoppingApi}api/Order/Orders`)
      .subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.log(error);
        });
  }

  public getOrdersChart(): any {
    return this.http.get<number[]>(`${environment.shoppingApi}api/v1/Chart/OrdersChart`)
      .subscribe(
        data => {
          this.lineChartData = [
            { data: data, label: 'Product Orders' },
          ];
        },
        error => {
          console.log(error);
        });
  }

  public getUserOrders(): any {

    const userId = this.authenticationService.currentUserValue.id;

    if (userId != null) {

      return this.http.get<Order[]>(`${environment.shoppingApi}api/Order/Orders/${userId}`)
        .subscribe(
          data => {
            this.orders = data;
          },
          error => {
            console.log(error);
          });
    }

  }

  public createOrder(requestModel: OrderRequest): any {
    return this.http.post<Order>(`${environment.shoppingApi}api/Order/Create`, requestModel)
      .pipe(map(data => {
        return data;
      }));
  }

  public refundOrder(orderId, refundTotal): any {
    const userId = this.authenticationService.currentUserValue.id;

    // tslint:disable-next-line:max-line-length
    return this.http.post<boolean>(`${environment.shoppingApi}api/Order/Refund?orderId=${orderId}&userId=${userId}&amount=${refundTotal}`, null)
      .pipe(map(data => {
        return data;
      }));
  }

  public acceptRefundOrder(orderId): any {
    return this.http.post<boolean>(`${environment.shoppingApi}api/Order/AcceptRefund?orderId=${orderId}`, null)
      .pipe(map(data => {
        return data;
      }));
  }

  public refuseRefundOrder(orderId): any {
    return this.http.post<boolean>(`${environment.shoppingApi}api/Order/RefuseRefund?orderId=${orderId}`, null)
      .pipe(map(data => {
        return data;
      }));
  }
}
