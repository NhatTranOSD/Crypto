import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from '../shop/shop.component';

import { ShopRoutingModule } from './shop-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PagingComponent } from '../../components/paging/paging.component';

@NgModule({
  declarations: [ShopComponent, OrderHistoryComponent, PagingComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ShopRoutingModule,
  
  ],
  bootstrap: [ShopComponent]
})
export class ShopModule { }
