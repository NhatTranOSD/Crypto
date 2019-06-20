import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../environments/environment';

import { Wallet } from '../../models/Wallet.model';
import { CurrencyDisplayName, WalletCurrency } from '../../models/WalletCurrency.model';
import { ComonFunctions } from '../../common/ComonFunctions';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public loading = false;
  public error = '';
  public selectedWallet: Wallet;
  public depositingWallet: Wallet;
  public currencyDisplayName = CurrencyDisplayName;

  public isCollapsed = false;
  public selectedCurrencyType: number;

  constructor(private modalService: NgbModal,
    private walletService: WalletService,
    public tokenService: TokenService,
    public comonFunctions: ComonFunctions) { }

  ngOnInit() {
    if (this.walletService.wallets === null) {
      this.walletService.getWalletInfo();
    }

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

  public makeDefaultWallets(): void {
    this.loading = true;
    this.walletService.createWallet(0).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.walletService.createWallet(1).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.walletService.getWalletInfo();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public selectWallet(selectedItem: Wallet) {
    this.selectedWallet = selectedItem;
    if (selectedItem.walletCurrencys[0].currencyType === 0) {
      this.tokenService.getTokenTransactions(this.selectedWallet.address, environment.contractAddress, 'asc');
    } else {
      this.tokenService.tokenTxs = null;
    }
  }

  public depositCoin(content, wallet: Wallet) {
    this.depositingWallet = wallet;
    this.modalService.open(content);
  }

}
