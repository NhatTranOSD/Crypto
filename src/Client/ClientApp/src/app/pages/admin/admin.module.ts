import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ChartComponent } from './chart/chart.component';
import { ProductOrderChartComponent } from './chart/product-order-chart/product-order-chart.component';
import { TokenOrderChartComponent } from './chart/token-order-chart/token-order-chart.component';
import { TokenOrderHistoryComponent } from './token-order-history/token-order-history.component';

@NgModule({
  declarations: [AdminComponent, CatalogComponent, HeaderComponent, OrderListComponent, TransactionListComponent, ChartComponent, ProductOrderChartComponent, TokenOrderChartComponent, TokenOrderHistoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ChartsModule,
    FormsModule, ReactiveFormsModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
