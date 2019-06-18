import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ShopComponent } from './pages/shop/shop.component';

import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
