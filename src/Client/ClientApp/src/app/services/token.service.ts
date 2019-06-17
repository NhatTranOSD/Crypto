import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenResponse } from '../models/responsemodels/TokenResponse.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public tokenTxs: TokenResponse[];

  constructor(private http: HttpClient) {

  }

  public getTokenTransactions(address: string, contractaddress: string, sort: string): void {
    const requestUri = `${environment.walletApi}api/v1/Token/TokenTxList?address=${address}&contractaddress=${contractaddress}&startblock=1&endblock=latest&sort=${sort}`;

    this.http.get<any>(requestUri)
      .subscribe(
        data => {
          this.tokenTxs = data.result;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
