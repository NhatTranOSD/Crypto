import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { first } from 'rxjs/operators';

import { Wallet } from '../../models/Wallet.model';
import { CurrencyDisplayName, WalletCurrency } from '../../models/WalletCurrency.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public loading = false;
  public error = '';
  public wallets: Wallet[];
  public selectedWallet: Wallet;
  public currencyDisplayName = CurrencyDisplayName;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    this.getWalletInfo();
  }

  public createWallet(): void {
    this.loading = true;
    this.walletService.createWallet(1).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.ngOnInit();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public getWalletInfo(): void {
    this.loading = true;
    this.walletService.getWalletInfo().pipe(first())
      .subscribe(
        data => {
          this.wallets = data;
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public selectWallet(selectedItem: Wallet) {
    this.selectedWallet = selectedItem;
  }

}
