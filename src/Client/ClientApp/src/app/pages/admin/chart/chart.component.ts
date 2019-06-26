import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public currentUTC: number = Date.now();

  constructor(public orderService: OrderService) {
  }

  ngOnInit() {
  }

}
