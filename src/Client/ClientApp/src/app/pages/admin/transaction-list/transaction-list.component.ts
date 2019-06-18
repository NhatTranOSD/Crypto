import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public adminAddress: string;
  public contractAdress: string;

  constructor(public tokenService: TokenService) {
    this.adminAddress = environment.adminAddress;
    this.contractAdress = environment.contractAdress;
  }

  ngOnInit() {
    this.tokenService.getTokenTransactions(this.adminAddress, this.contractAdress, 'asc');
    this.tokenService.getAdminBalance(this.adminAddress, '', this.contractAdress);
    this.tokenService.getTokenSupply('', this.contractAdress);
  }

  public convertToDateTime(unixtimestamp: string): any {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(+unixtimestamp * 1000);

    // Will display time in 10:30:23 format
    const formattedTime = date.toLocaleString();

    return formattedTime;
  }

  equalString(a: string, b: string) {
    if (a.toLowerCase() === b.toLowerCase()) {
      return true;
    } else {
      return false;

    }
  }

}
