import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ShopComponent } from './pages/shop/shop.component';
import { EmailConfirmationComponent } from './components/emailconfirmation/emailconfirmation.component';
import { TokenOrderHistoryComponent } from './components/token-orderhistory/token-orderhistory.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';

const routes: Routes = [
  {
    path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule',
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'tokenorders', component: TokenOrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopModule' },
  { path: 'emailconfirmation', component: EmailConfirmationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'shop' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
