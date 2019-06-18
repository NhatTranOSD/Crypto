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
  public adminBalance: number;
  public tokenSupply: number;

  constructor(private http: HttpClient) {

  }

  public getTokenTransactions(address: string, contractaddress: string, sort: string): void {
    // tslint:disable-next-line: max-line-length
    const requestUri = `${environment.walletApi}api/v1/Token/TokenTxList?address=${address}&contractaddress=${contractaddress}&startblock=1&endblock=latest&sort=${sort}`;

    this.http.get<any>(requestUri)
      .subscribe(
        data => {
          this.tokenTxs = data.result;
        },
        error => {
          console.log(error);
        });
  }

  public getAdminBalance(address: string, tokenname: string, contractaddress: string): any {
    // tslint:disable-next-line:max-line-length
    const requestUri = `${environment.walletApi}api/v1/Token/TokenBalance?address=${address}&tokenname=${tokenname}&contractaddress=${contractaddress}`;

    this.http.get<any>(requestUri)
      .subscribe(
        data => {
          if (data !== null) {
            this.adminBalance = data / 1000000000000000000;
          }
        },
        error => {
          console.log(error);
        });
  }

  public getTokenSupply(tokenname: string, contractaddress: string): any {
    // tslint:disable-next-line:max-line-length
    const requestUri = `${environment.walletApi}api/v1/Token/TokenSupply?tokenname=${tokenname}&contractaddress=${contractaddress}`;

    this.http.get<any>(requestUri)
      .subscribe(
        data => {
          if (data !== null) {
            this.tokenSupply = data.result / 1000000000000000000;
          }
        },
        error => {
          console.log(error);
        });
  }
}
