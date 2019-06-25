import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { AdminComponent } from './admin.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ChartComponent } from '../admin/chart/chart.component';


const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: 'charts',
                component: ChartComponent,
            },
            {
                path: 'catalog',
                component: CatalogComponent,
            },
            {
                path: 'orders',
                component: OrderListComponent,
            },
            {
                path: 'transactions',
                component: TransactionListComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
