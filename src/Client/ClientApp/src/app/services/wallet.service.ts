import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

import { environment } from '../../environments/environment';
import { Wallet } from '../models/Wallet.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private currentUser: User;
  public wallets: Wallet[];

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  public createWallet(currencytype: number) {

    const requestmodel = {
      userId: this.currentUser.id,
      currencyType: currencytype,
    };

    return this.http.post<boolean>(`${environment.walletApi}api/v1/Wallet/Create`, requestmodel)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        return data;
      }));
  }

  public getWalletInfo(): any {

    return this.http.get<Wallet[]>(`${environment.walletApi}api/v1/Wallet/${this.currentUser.id}`)
      .subscribe(
        data => {
          this.wallets = data;
        },
        error => {
          console.log(error);
        });
  }
}
