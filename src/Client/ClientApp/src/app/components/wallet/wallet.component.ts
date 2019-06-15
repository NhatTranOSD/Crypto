import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  public depositingWallet: Wallet;
  public currencyDisplayName = CurrencyDisplayName;

  public isCollapsed = false;
  public selectedCurrencyType: number;

  constructor(private modalService: NgbModal, private walletService: WalletService) { }

  ngOnInit() {
    this.getWalletInfo();
  }

  public createWallet(): void {

    if (this.selectedCurrencyType) {
      this.loading = true;
      this.walletService.createWallet(this.selectedCurrencyType).pipe(first())
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

  public depositCoin(content, wallet: Wallet) {
    this.depositingWallet = wallet;
    this.modalService.open(content);
  }

}
