import { Component, OnInit } from '@angular/core';

import { TokenService } from '../../../services/token.service';
import { TokenOrderStatus, PairType } from '../../../models/tokenorder.model';

@Component({
  selector: 'app-token-order-history',
  templateUrl: './token-order-history.component.html',
  styleUrls: ['./token-order-history.component.css']
})
export class TokenOrderHistoryComponent implements OnInit {

  public tokenOrderStatus = TokenOrderStatus;
  public pairType = PairType;

  constructor(public tokenService: TokenService) {

  }

  ngOnInit() {
    this.tokenService.getTokenOrders();
  }

}
