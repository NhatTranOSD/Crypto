import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { ProductRequest } from '../models/requestmodels/productrequest.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[];

  constructor(private http: HttpClient) {

  }

  public getProducts(): any {
    return this.http.get<Product[]>(`${environment.shoppingApi}api/Product/Products`)
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error);
        });
  }

  public createProduct(requestModel: ProductRequest): any {
    return this.http.post<boolean>(`${environment.shoppingApi}api/Product/Create`, requestModel)
      .pipe(map(products => {
        return products;
      }));
  }

  public updateProduct(productid: string, requestModel: ProductRequest): any {
    return this.http.post<boolean>(`${environment.shoppingApi}api/Product/${productid}/Update`, requestModel)
      .pipe(map(products => {
        return products;
      }));
  }

  public deleteProduct(productid: string): any {
    return this.http.post<Product>(`${environment.shoppingApi}api/Product/${productid}/Delete`, null)
      .pipe(map(products => {
        return products;
      }));
  }
}
