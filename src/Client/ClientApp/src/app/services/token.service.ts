import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenTxResponse } from '../models/responsemodels/TokenTxResponse.model';
import { TokenConfig } from '../models/TokenConfig.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public tokenTxs: TokenTxResponse[];
  public tokenConfig: TokenConfig;
  public adminBalance: number;
  public tokenSupply: number;

  constructor(private http: HttpClient) {

  }

  public getTokenConfig(): void {
    // tslint:disable-next-line: max-line-length
    const requestUri = `${environment.walletApi}api/v1/Token/TokenInfo`;

    this.http.get<TokenConfig>(requestUri)
      .subscribe(
        data => {
          this.tokenConfig = data;
          if (this.tokenConfig !== null) {
            this.getTokenTransactions(this.tokenConfig.adminAddress, this.tokenConfig.contractAddress, 'asc');
            this.getAdminBalance(this.tokenConfig.adminAddress, '', this.tokenConfig.contractAddress);
            this.getTokenSupply('', this.tokenConfig.contractAddress);
          }
        },
        error => {
          console.log(error);
        });
  }

  public updateTokenConfig(requestModel: TokenConfig): any {
    return this.http.post<boolean>(`${environment.walletApi}api/v1/Token/UpdateToken`, requestModel)
      .pipe(map(data => {
        return data;
      }));
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
