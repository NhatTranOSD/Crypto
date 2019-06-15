import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ProductRequest } from '../models/requestmodels/productrequest.model';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { OrderRequest } from '../models/requestmodels/orderrequest.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders: Order[];

  constructor(private http: HttpClient) { }

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

  public getOrdersById(userId: string): any {
    return this.http.get<Order[]>(`${environment.shoppingApi}api/Order/Orders/${userId}`)
      .subscribe(
        data => {
          this.orders = data;
        },
        error => {
          console.log(error);
        });
  }

  public createOrder(requestModel: OrderRequest): any {
    return this.http.post<Order>(`${environment.shoppingApi}api/Order/Create`, requestModel)
      .pipe(map(data => {
        return data;
      }));
  }
}
