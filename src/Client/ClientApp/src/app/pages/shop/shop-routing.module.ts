import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
    { path: 'items', component: ShopComponent },
    { path: 'history', component: OrderHistoryComponent },
    { path: '**', redirectTo: 'items' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
