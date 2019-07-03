import { Component, OnInit } from '@angular/core';

import { TokenService } from '../../services/token.service';
import { TokenOrderStatus, PairType } from '../../models/tokenorder.model';

@Component({
  selector: 'app-token-orderhistory',
  templateUrl: './token-orderhistory.component.html',
  styleUrls: ['./token-orderhistory.component.css']
})
export class TokenOrderHistoryComponent implements OnInit {

  public tokenOrderStatus = TokenOrderStatus;
  public pairType = PairType;

  constructor(public tokenService: TokenService) {

  }

  ngOnInit() {
    this.tokenService.getUserTokenOrders();
  }

}
