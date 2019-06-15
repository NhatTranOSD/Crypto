import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [AdminComponent, CatalogComponent, HeaderComponent, OrderListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
