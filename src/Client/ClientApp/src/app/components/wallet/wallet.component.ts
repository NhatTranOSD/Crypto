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
      amount: [0, Validators.required],
      pair: [0, Validators.required]
    });
    this.buyingWallet = wallet;
    this.modalService.open(content);
  }

  public buyNow() {
    this.submitted = true;
    if (this.buyForm.invalid) {
      return;
    }

    this.modalService.dismissAll();

    this.tokenService.trading = true;
    alert('transactions are being made. Please wait and check Token order history');

    this.tokenService.buyToken(this.f.amount.value, this.f.pair.value)
      .pipe(first())
      .subscribe(
        data => {
          this.tokenService.trading = false;
          this.walletService.getWalletInfo();
          alert('Buy FCoin success');
        },
        error => {
          this.tokenService.trading = false;
          alert('Buy FCoin error');
        });

  }

}
