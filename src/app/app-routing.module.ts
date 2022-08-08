import { ClosedOrderComponent } from './components/order/closedOrder/closedOrder.component';
import { AddorderComponent } from './components/order/addorder/addorder.component';
import { OrderComponent } from './components/order/order.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { SorttableComponent } from './components/sorttable/sorttable.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountComponent } from '../app/components/account/account.component';
import { BalanceComponent } from '../app/components/balance/balance.component';
import { NoticesComponent } from './components/notices/notices.component';
import { LoansComponent } from './components/loans/loans.component';
import { CardsComponent } from './components/cards/cards.component';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { ProductComponent } from './components/product/product.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'notices', component: NoticesComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'myAccount', component: AccountComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myBalance', component: BalanceComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myLoans', component: LoansComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'myCards', component: CardsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'createAccount', component: CreateAccountComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'product', component: ProductComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'client', component: ClientComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'sorttable', component: SorttableComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'clientedit/:id', component: ClientEditComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'order', component: OrderComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'addorder/:id', component: AddorderComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'closedOrder', component: ClosedOrderComponent, canActivate: [AuthActivateRouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
