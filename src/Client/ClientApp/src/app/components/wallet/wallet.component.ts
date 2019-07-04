import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { first } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { environment } from '../../../environments/environment';

import { Wallet } from '../../models/Wallet.model';
import { CurrencyDisplayName, WalletCurrency } from '../../models/WalletCurrency.model';
import { ComonFunctions } from '../../common/ComonFunctions';
import { NotifyService } from './../../services/notify.service';

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

  public buyingWallet: Wallet;
  public buyForm: FormGroup;
  public submitted = false;

  public currencyDisplayName = CurrencyDisplayName;

  public isCollapsed = false;
  public selectedCurrencyType: number;

  constructor(private modalService: NgbModal,
    private walletService: WalletService,
    public tokenService: TokenService,
    public comonFunctions: ComonFunctions,
    public notify: NotifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.walletService.wallets === null) {
      this.walletService.getWalletInfo();
    }

    this.tokenService.getTokenConfig();
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
          this.walletService.getWalletInfo();
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public selectWallet(selectedItem: Wallet) {
    this.selectedWallet = selectedItem;
    if (selectedItem.walletCurrency.currencyType === 0) {
      this.tokenService.getTokenTransactions(this.selectedWallet.account.address, environment.contractAddress, 'asc');
    } else {
      this.tokenService.tokenTxs = null;
    }
  }

  public depositCoin(content, wallet: Wallet) {
    this.depositingWallet = wallet;
    this.modalService.open(content);
  }

  // convenience getter for easy access to form fields
  get f() { return this.buyForm.controls; }

  public buyCoin(content, wallet: Wallet) {
    this.buyForm = this.formBuilder.group({
      amount: [1, Validators.required],
      pair: [0, Validators.required]
    });

    this.buyingWallet = wallet;
    this.modalService.open(content);
  }

  public buyNow() {
    this.submitted = true;
    if (this.buyForm.invalid || this.f.amount.value < 1) {
      this.error = 'Invalid inputs';
      return;
    } else {
      this.error = '';
    }

    // Check valid ETH
    let currentETH = 0; // Wei

    this.walletService.wallets.forEach(function (wallet) {
      if (wallet.walletCurrency.currencyType === 1) {
        currentETH = +wallet.walletCurrency.balance; //Wei
      }
    });

    if (this.f.amount.value * 1000000000000000000 / 20 > currentETH - 100000000000) {
      this.notify.showNotification('warning', 'Sorry, your ETH Balance is not enough.');
      return;
    };

    this.modalService.dismissAll();

    this.tokenService.trading = true;
    
    this.notify.showNotification('info', 'Transactions are being made. Please wait and check Token order history');

    this.tokenService.buyToken(this.f.amount.value, this.f.pair.value)
      .pipe(first())
      .subscribe(
        data => {
          this.tokenService.trading = false;
          if (data === true) {
            this.walletService.getWalletInfo();
            this.notify.showNotification('success', 'Buy FCoin Success');
          } else {
            this.notify.showNotification('warning', 'Buy FCoin Failed');
          }
        },
        error => {
          this.tokenService.trading = false;
          this.notify.showNotification('warning', 'Buy FCoin Failed');
        });

  }

}
