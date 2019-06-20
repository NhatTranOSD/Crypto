import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/User.model';
import { WalletService } from '../../services/wallet.service';
import { CurrencyDisplayName } from '../../models/WalletCurrency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public currentUser: User;
  public currencyDisplayName = CurrencyDisplayName;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public walletService: WalletService
  ) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser !== null) {
      this.walletService.getWalletInfo();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
